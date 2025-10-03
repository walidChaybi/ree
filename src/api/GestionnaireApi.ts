import {
  TApiAutorisee,
  TBaseUri,
  TConfigurationRequeteHttp,
  TErreurApi,
  THeader,
  TMethodeHttp,
  TReponseApiEchec,
  TReponseApiSucces
} from "@model/api/Api";
import { CSRF_HEADER_NAME, getCsrfCookieValue } from "@util/CsrfUtil";
import { Generateur } from "@util/generateur/Generateur";
import * as superagent from "superagent";
import AfficherMessage from "../utils/AfficherMessage";
import { StockageLocal } from "../utils/StockageLocal";

const ID_CORRELATION_HEADER_NAME = "X-Correlation-Id";

export class GestionnaireApi {
  private readonly url: string;
  private readonly domaine: string;
  private readonly nom: string;
  private readonly version: string;
  private static instance: GestionnaireApi;

  private constructor(nom: TApiAutorisee, version: string) {
    this.url = `${window.location.protocol}//${window.location.hostname}`;
    this.domaine = "rece";
    this.nom = nom;
    this.version = version;
  }

  public static getInstance(name: TApiAutorisee, version: string): GestionnaireApi {
    if (!(GestionnaireApi.instance && GestionnaireApi.instance.nom === name && GestionnaireApi.instance.version === version)) {
      GestionnaireApi.instance = new GestionnaireApi(name, version);
    }

    return GestionnaireApi.instance;
  }

  private getUri(): string {
    return [this.url, this.domaine, this.nom, this.version].join("/");
  }

  public async fetch<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined, TResultat extends object>(
    httpRequestConfig: TConfigurationRequeteHttp<TUri, TBody, TQuery>
  ): Promise<TReponseApiSucces<TResultat> | TReponseApiEchec> {
    const codeErreurForbidden = 403;

    httpRequestConfig.uri = this.traitementParametresPath(httpRequestConfig.uri, httpRequestConfig.path);

    const httpRequete = this.traitementMethodeHttp(httpRequestConfig.methode, httpRequestConfig.uri);

    this.addCsrfInfosToConfigHeader(httpRequestConfig);
    this.traitementHeaders(httpRequete, httpRequestConfig.headers);
    this.traitementParametresQuery(httpRequete, httpRequestConfig.query);
    this.traitementParametresBody(httpRequete, httpRequestConfig.body);
    this.traitementTypeReponse(httpRequete, httpRequestConfig);

    return httpRequete
      .then(response => {
        if (typeof response.body === "string") {
          const erreur: TReponseApiEchec = {
            status: 500,
            erreurs: [
              {
                message: "Réponse HTML inattendue du serveur."
              } as TErreurApi
            ]
          };
          return Promise.reject(erreur);
        }

        return Promise.resolve<TReponseApiSucces<TResultat>>({
          data: response.body?.data || {},
          avertissements: response.body?.errors || [],
          status: response.status,
          headers: response.header
        });
      })
      .catch(({ response, erreurs, status }) => {
        const erreur: TReponseApiEchec = {
          status: response?.status ?? status,
          erreurs: response?.body?.errors ?? erreurs ?? []
        };

        if (process.env.NODE_ENV === "development" && erreur.status !== codeErreurForbidden) {
          AfficherMessage.erreur(
            [
              `[DEV] Une erreur ${erreur.status} est survenue`,
              ...erreur.erreurs.map((erreur: { message: any }) => `[DEV] ${erreur.message}`)
            ],
            { erreurs }
          );
        }

        return Promise.reject<TReponseApiEchec>(erreur);
      });
  }

  private addCsrfInfosToConfigHeader<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined>(
    config: TConfigurationRequeteHttp<TUri, TBody, TQuery>
  ): void {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers[CSRF_HEADER_NAME] = getCsrfCookieValue();
  }

  private traitementHeaders(httpRequest: superagent.SuperAgentRequest, headers?: THeader): void {
    if (headers) {
      Object.entries(headers).forEach(([header, value]) => {
        httpRequest.set(header, value);
      });
      httpRequest = this.desactiverCacheNavigateur(httpRequest);
      httpRequest.set("Content-Type", "application/json");
      httpRequest.set(ID_CORRELATION_HEADER_NAME, Generateur.genereCleUnique());

      // Lit d’éventuels Id/profil AROBAS dans le local storage et les fixe en header pour bouchonner AROBAS (à l'usage des UAT).
      // Sur tous les environnements protégés par le SSO AROBAS, le service provider détecte la présence de l'ID et rejette la requête car c'est lui qui fixe ce header.
      const profil = StockageLocal.recuperer("PROFIL_RECE", false);
      const idSSO = StockageLocal.recuperer("ID_SSO", false);

      profil && httpRequest.set("profil", profil);
      idSSO && httpRequest.set("id_sso", idSSO);
    }
  }

  private traitementParametresPath<TUri extends TBaseUri>(uri: TUri, parametres?: object): TUri {
    if (!parametres) {
      return uri;
    }

    let uriAvecPath = uri;
    Object.entries(parametres).forEach(([cle, valeur]) => {
      uriAvecPath = uriAvecPath.replace(`:${cle}`, valeur) as TUri;
    });

    return uriAvecPath;
  }

  private traitementParametresQuery(httpRequest: superagent.SuperAgentRequest, parameters?: object): void {
    if (parameters) {
      httpRequest.query(parameters);
    }
  }

  private traitementParametresBody(httpRequest: superagent.SuperAgentRequest, body?: object): void {
    if (body) {
      httpRequest.send(body);
    }
  }

  private traitementTypeReponse<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined>(
    httpRequete: superagent.SuperAgentRequest,
    config: TConfigurationRequeteHttp<TUri, TBody, TQuery>
  ): void {
    if (config.responseType) {
      httpRequete.responseType(config.responseType);
    }
  }

  private traitementMethodeHttp(method: TMethodeHttp, uri: string): superagent.SuperAgentRequest {
    switch (method) {
      case "GET":
        return superagent.get(this.getUri() + uri);
      case "DELETE":
        return superagent.delete(this.getUri() + uri);
      case "PATCH":
        return superagent.patch(this.getUri() + uri);
      case "PUT":
        return superagent.put(this.getUri() + uri);
      case "POST":
        return superagent.post(this.getUri() + uri);
    }
  }

  private desactiverCacheNavigateur(res: superagent.SuperAgentRequest) {
    res = res.set("Cache-Control", "no-cache, no-store, max-age=0");
    res = res.set("Expires", "Thu, 1 Jan 1970 00:00:00 GMT");
    res = res.set("Pragma", "no-cache");
    return res;
  }
}
