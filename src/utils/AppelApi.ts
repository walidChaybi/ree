import {
  TApiAutorisee,
  TBaseUri,
  TConfigurationApi,
  TConfigurationRequeteHttp,
  THeader,
  TParametres,
  TReponseApiEchec,
  TReponseApiSucces
} from "@model/api/Api";
import { CSRF_HEADER_NAME, getCsrfCookieValue } from "@util/CsrfUtil";
import axios from "axios";
import AfficherMessage from "./AfficherMessage";
import { StockageLocal } from "./StockageLocal";

interface IReponseErreur extends Error {
  response: {
    status: number;
    data: {
      errors: {
        message: string;
      }[];
    };
  };
}

type TAppelParams<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined> = {
  api: {
    nom: TApiAutorisee;
    version: string;
    estExterne?: boolean;
  };
  configurationRequete: TConfigurationRequeteHttp<TUri, TBody, TQuery>;
};

const CODE_FORBIDDEN = 403;

const genererUri = <TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined>(
  appelParams: TAppelParams<TUri, TBody, TQuery>
): TUri => {
  const baseUri = appelParams.api.estExterne
    ? appelParams.api.nom
    : `${window.location.protocol}//${window.location.hostname}/rece/${appelParams.api.nom}/${appelParams.api.version}`;

  const uriAvecPathParams = Object.entries(appelParams.configurationRequete.path ?? {}).reduce(
    (uriGeneree, [cle, valeur]) => uriGeneree.replace(`:${cle}`, valeur as string) as TUri,
    appelParams.configurationRequete.uri
  );
  const hasQueryParams = uriAvecPathParams.includes("?");
  const query = Object.entries(appelParams.configurationRequete.query ?? {})
    .map(([cle, valeur]) => `${cle}=${valeur}`)
    .join("&");

  if (query) {
    return `${baseUri}${uriAvecPathParams}${hasQueryParams ? "&" : "?"}${query}` as TUri;
  }

  return `${baseUri}${uriAvecPathParams}` as TUri;
};

const API = {
  appel: <TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined, TResultat extends object>(
    appelParams: TAppelParams<TUri, TBody, TQuery>
  ) => {
    // Lit d’éventuels Id/profil AROBAS dans le local storage et les fixe en header pour bouchonner AROBAS (à l'usage des UAT).
    // Sur tous les environnements protégés par le SSO AROBAS, le service provider détecte la présence de l'ID et rejette la requête car c'est lui qui fixe ce header.
    const profil = StockageLocal.recuperer("PROFIL_RECE", false);
    const idSSO = StockageLocal.recuperer("ID_SSO", false);

    return axios({
      method: appelParams.configurationRequete.methode.toLowerCase(),
      url: genererUri(appelParams),
      responseType: appelParams.configurationRequete.responseType,
      data: appelParams.configurationRequete.body ?? {},
      headers: {
        ...appelParams.configurationRequete.headers,
        ...(appelParams.api.estExterne ? {} : { [CSRF_HEADER_NAME]: getCsrfCookieValue() }),
        ...(profil ? { profil: profil } : {}),
        ...(idSSO ? { id_sso: idSSO } : {})
      }
    })
      .then(response => {
        if (typeof response.data === "string") {
          const error = new Error("Réponse HTML inattendue du serveur") as IReponseErreur;
          error.response = {
            status: 500,
            data: {
              errors: [
                {
                  message: "Réponse HTML inattendue du serveur."
                }
              ]
            }
          };

          return Promise.reject(error);
        }

        return Promise.resolve<TReponseApiSucces<TResultat>>({
          data: (appelParams.api.estExterne ? response.data : response.data?.data) ?? null,
          avertissements: response.data?.errors ?? [],
          status: response.status,
          headers: response.headers as THeader
        });
      })
      .catch(({ response, erreurs }) => {
        const erreur: TReponseApiEchec = {
          status: response.status,
          erreurs: response.data?.errors ?? []
        };

        if (process.env.NODE_ENV === "development" && erreur.status !== CODE_FORBIDDEN) {
          AfficherMessage.erreur(
            [`[DEV] Une erreur ${erreur.status} est survenue`, ...erreur.erreurs.map(erreur => `[DEV] ${erreur.message}`)],
            { erreurs }
          );
        }

        return Promise.reject<TReponseApiEchec>(erreur);
      });
  }
} as const;

export const appelApiAvecAxios = <
  TUri extends TBaseUri,
  TBody extends object | undefined = undefined,
  TQuery extends object | undefined = undefined,
  TResultat = unknown
>(
  configuration: TConfigurationApi<TUri, TBody, TQuery, TResultat>,
  parametres: TParametres<TUri, TBody, TQuery>
) => {
  API.appel({
    api: configuration.api,
    configurationRequete: {
      methode: configuration.methode,
      uri: configuration.uri,
      ...parametres
    }
  });
};

export default API;
