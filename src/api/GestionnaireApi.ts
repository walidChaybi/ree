import {
  TApiAutorisee,
  TBaseUri,
  TConfigurationRequeteHttp,
  THeader,
  TMethodeHttp,
  TReponseApiEchec,
  TReponseApiSucces
} from "@model/api/Api";
import { CSRF_HEADER_NAME, getCsrfCookieValue } from "@util/CsrfUtil";
import messageManager from "@util/messageManager";
import * as superagent from "superagent";

export const ID_CORRELATION_HEADER_NAME = "X-Correlation-Id";

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

  public static getInstance(
    name: TApiAutorisee,
    version: string
  ): GestionnaireApi {
    if (
      !(
        GestionnaireApi.instance &&
        GestionnaireApi.instance.nom === name &&
        GestionnaireApi.instance.version === version
      )
    ) {
      GestionnaireApi.instance = new GestionnaireApi(name, version);
    }

    return GestionnaireApi.instance;
  }

  private getUri(): string {
    return [this.url, this.domaine, this.nom, this.version].join("/");
  }

  public async fetch<
    TUri extends TBaseUri,
    TBody extends object | undefined,
    TQuery extends object | undefined,
    TResultat extends object
  >(
    httpRequestConfig: TConfigurationRequeteHttp<TUri, TBody, TQuery>
  ): Promise<TReponseApiSucces<TResultat> | TReponseApiEchec> {
    const codeErreurForbidden = 403;

    httpRequestConfig.uri = this.traitementParametresPath(
      httpRequestConfig.uri,
      httpRequestConfig.path
    );

    const httpRequete = this.traitementMethodeHttp(
      httpRequestConfig.methode,
      httpRequestConfig.uri
    );

    this.addCsrfInfosToConfigHeader(httpRequestConfig);
    this.traitementHeaders(httpRequete, httpRequestConfig.headers);
    this.traitementParametresQuery(httpRequete, httpRequestConfig.query);
    this.traitementParametresBody(httpRequete, httpRequestConfig.body);
    this.traitementTypeReponse(httpRequete, httpRequestConfig);

    return httpRequete
      .then(response => {
        return Promise.resolve<TReponseApiSucces<TResultat>>({
          data: response.body?.data || {},
          avertissements: response.body?.errors || [],
          status: response.status,
          headers: response.header
        });
      })
      .catch(({ response }) => {
        const erreur: TReponseApiEchec = {
          status: response.status,
          erreurs: response.body?.errors || []
        };

        if (
          process.env.NODE_ENV === "development" &&
          erreur.status !== codeErreurForbidden
        ) {
          messageManager.showErrors([
            `[DEV] Une erreur ${erreur.status} est survenue`,
            ...erreur.erreurs.map(
              (erreur: { message: any }) => `[DEV] ${erreur.message}`
            )
          ]);
          /*          messageManager.showErrorAndClose([
            `[DEV] Une erreur ${erreur.status} est survenue`,
            ...erreur.erreurs.map(
              (erreur: { message: any }) => `[DEV] ${erreur.message}`
            )
          ]); */
        }

        return Promise.reject<TReponseApiEchec>(erreur);
      });
  }

  private addCsrfInfosToConfigHeader<
    TUri extends TBaseUri,
    TBody extends object | undefined,
    TQuery extends object | undefined
  >(config: TConfigurationRequeteHttp<TUri, TBody, TQuery>): void {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers[CSRF_HEADER_NAME] = getCsrfCookieValue();
  }

  private traitementHeaders(
    httpRequest: superagent.SuperAgentRequest,
    headers?: THeader
  ): void {
    if (headers) {
      Object.entries(headers).forEach(([header, value]) => {
        httpRequest.set(header, value);
      });
    }
  }

  private traitementParametresPath<TUri extends TBaseUri>(
    uri: TUri,
    parametres?: object
  ): TUri {
    if (!parametres) {
      return uri;
    }

    let uriAvecPath = uri;
    Object.entries(parametres).forEach(([cle, valeur]) => {
      uriAvecPath = uriAvecPath.replace(`:${cle}`, valeur) as TUri;
    });

    return uriAvecPath;
  }

  private traitementParametresQuery(
    httpRequest: superagent.SuperAgentRequest,
    parameters?: object
  ): void {
    if (parameters) {
      httpRequest.query(parameters);
    }
  }

  private traitementParametresBody(
    httpRequest: superagent.SuperAgentRequest,
    body?: object
  ): void {
    if (body) {
      httpRequest.send(body);
    }
  }

  private traitementTypeReponse<
    TUri extends TBaseUri,
    TBody extends object | undefined,
    TQuery extends object | undefined
  >(
    httpRequete: superagent.SuperAgentRequest,
    config: TConfigurationRequeteHttp<TUri, TBody, TQuery>
  ): void {
    if (config.responseType) {
      httpRequete.responseType(config.responseType);
    }
  }

  private traitementMethodeHttp(
    method: TMethodeHttp,
    uri: string
  ): superagent.SuperAgentRequest {
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
}
