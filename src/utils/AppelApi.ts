/* v8 ignore start */
// Code pas encore utilisé. V8 ignore peut être supprimé quand superagent sera remplacé par axios
import { TApiAutorisee, TBaseUri, TConfigurationRequeteHttp, THeader, TReponseApiEchec, TReponseApiSucces } from "@model/api/Api";
import { CSRF_HEADER_NAME, getCsrfCookieValue } from "@util/CsrfUtil";
import messageManager from "@util/messageManager";
import axios from "axios";

export interface IReponseErreur extends Error {
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
export const ID_CORRELATION_HEADER_NAME = "X-Correlation-Id";

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
  ) =>
    axios({
      method: appelParams.configurationRequete.methode.toLowerCase(),
      url: genererUri(appelParams),
      responseType: appelParams.configurationRequete.responseType,
      data: appelParams.configurationRequete.body ?? {},
      headers: {
        [CSRF_HEADER_NAME]: getCsrfCookieValue(),
        ...appelParams.configurationRequete.headers
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
          data: (appelParams.api.estExterne ? response.data : response.data?.data) || {},
          avertissements: response.data?.errors ?? [],
          status: response.status,
          headers: response.headers as THeader
        });
      })
      .catch(({ response }) => {
        const erreur: TReponseApiEchec = {
          status: response.status,
          erreurs: response.data?.errors ?? []
        };

        if (process.env.NODE_ENV === "development" && erreur.status !== CODE_FORBIDDEN) {
          messageManager.showErrors([
            `[DEV] Une erreur ${erreur.status} est survenue`,
            ...erreur.erreurs.map(erreur => `[DEV] ${erreur.message}`)
          ]);
        }

        return Promise.reject<TReponseApiEchec>(erreur);
      })
} as const;

export default API;
/* v8 ignore end */
