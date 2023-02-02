import { URL_ACCUEIL } from "@router/ReceUrls";
import { getCsrfHeader } from "@util/CsrfUtil";
import { Generateur } from "@util/generateur/Generateur";
import { GestionnaireCache, ReceCache } from "@util/GestionnaireCache";
import messageManager from "@util/messageManager";
import request, * as superagent from "superagent";
import { configAgent } from "../mock/superagent-config/superagent-mock-agent";
import { configEtatcivil } from "../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../mock/superagent-config/superagent-mock-requetes";

export const ID_CORRELATION_HEADER_NAME = "X-Correlation-Id";
const EXPIRATION_CACHE_SECONDS = 43200; // Expiration du cache au bout de 12h (43200 secondes)

export const HTTP_STATUS_OK = 200;

export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_PAYLOAD_TOO_LARGE = 413;
export const HTTP_REQUEST_TIME_OUT = 408;

const ERROR_OFFLINE_TIMEOUT = 5000;

if (process.env.REACT_APP_MOCK) {
  require("superagent-mock")(request, [
    configRequetes[0],
    configAgent[0],
    configEtatcivil[0]
  ]);
}

type ApisAutorisees =
  | "rece-requete-api"
  | "rece-agent-api"
  | "rece-etatcivil-api"
  | "rece-outiltech-api"
  | "rece-composition-api"
  | "rece-mail-api"
  | "rece-televerification-api";

export enum HttpMethod {
  GET,
  DELETE,
  PATCH,
  POST,
  PUT
}

export interface HttpRequestHeader {
  header: string;
  value: string;
}

interface HttpRequestConfig {
  uri: string;
  method: HttpMethod;
  parameters?: any;
  data?: any;
  headers?: HttpRequestHeader[];
  responseType?: "blob";
}

export interface IHttpResponse {
  body?: any;
  status: number;
}

const DOMAIN = "rece";
type API_ERROR_TYPE =
  | "erreurOffLine"
  | "toutesErreursSaufForbidden"
  | undefined;
export class ApiManager {
  private readonly url: string;
  private readonly domain: string;
  private readonly name: string;
  private readonly version: string;
  private static instance: ApiManager;
  private readonly cache: ReceCache;

  private constructor(name: ApisAutorisees, version: string) {
    this.url = `${window.location.protocol}//${window.location.hostname}`;
    this.domain = DOMAIN;
    this.name = name;
    this.version = version;
    this.cache = GestionnaireCache.addCache(name, EXPIRATION_CACHE_SECONDS);
  }

  public static getInstance(name: ApisAutorisees, version: string): ApiManager {
    if (
      !(
        ApiManager.instance &&
        ApiManager.instance.name === name &&
        ApiManager.instance.version === version
      )
    ) {
      ApiManager.instance = new ApiManager(name, version);
    }

    return ApiManager.instance;
  }

  public getUri(): string {
    return `${this.url}/${this.domain}/${this.name}/${this.version}`;
  }

  public fetch(httpRequestConfig: HttpRequestConfig): Promise<any> {
    return this.fetchData(httpRequestConfig);
  }

  public fetchCache(httpRequestConfig: HttpRequestConfig): Promise<any> {
    const dataCache = this.cache.get(this.buildCacheKey(httpRequestConfig));
    if (dataCache !== undefined) {
      return Promise.resolve({
        body: dataCache.body,
        status: dataCache.status,
        headers: dataCache.header
      });
    } else {
      return this.fetchData(httpRequestConfig, true);
    }
  }

  public fetchData(
    httpRequestConfig: HttpRequestConfig,
    useCache = false
  ): Promise<any> {
    let httpRequete = this.processRequestMethod(
      httpRequestConfig.method,
      httpRequestConfig.uri
    );

    // Ajout de l'id de corrélation dans l'entête
    this.addIdCorrelationToConfigHeader(httpRequestConfig);

    // Ajout de la valeur du cookie csrf dans l'entête
    this.addCsrfInfosToConfigHeader(httpRequestConfig);

    if (httpRequestConfig.parameters) {
      httpRequete = this.processRequestQueyParameters(
        httpRequestConfig.parameters,
        httpRequete
      );
    }

    if (httpRequestConfig.data) {
      httpRequete = this.processRequestData(
        httpRequestConfig.data,
        httpRequete
      );
    }

    httpRequete = this.processRequestHeaders(
      httpRequete,
      httpRequestConfig.headers
    );

    if (httpRequestConfig.responseType) {
      httpRequete = httpRequete.responseType(httpRequestConfig.responseType);
    }

    return httpRequete
      .then(response => {
        if (useCache) {
          this.cache.set(this.buildCacheKey(httpRequestConfig), {
            body: response.body,
            status: response.status,
            headers: response.header
          });
        }

        return Promise.resolve({
          body: response.body,
          status: response.status,
          headers: response.header
        });
      })
      .catch(error => {
        /* istanbul ignore next */
        error.uri = httpRequestConfig.uri;
        error.parameters = httpRequestConfig.parameters;
        const errorType = this.manageApiError(error);
        if (errorType === "erreurOffLine") {
          // Permet à l'application de se recharger avant l'affichage de  l'erreur
          setTimeout(() => {
            Promise.reject(error);
          }, ERROR_OFFLINE_TIMEOUT);
        } else {
          return Promise.reject(error);
        }
      });
  }

  /* istanbul ignore next */
  private manageApiError(error: any): API_ERROR_TYPE {
    let errorType: API_ERROR_TYPE = undefined;
    if (
      error &&
      error.message &&
      error.message.indexOf("offline") !== -1 &&
      error.crossDomain === true
    ) {
      errorType = "erreurOffLine";
      // Force la reconnexion
      window.location.replace(URL_ACCUEIL);
    } else if (
      process.env.NODE_ENV === "development" &&
      error.status !== HTTP_FORBIDDEN
    ) {
      errorType = "toutesErreursSaufForbidden";
      messageManager.showError(
        `Une erreur est survenue: ${error ? error.message : "inconnue"}`
      );
    } else if (process.env.NODE_ENV === "test") {
      const message = `Erreur mock api: ${error?.uri}`;

      const messageParametres = `     parameters: ${
        error?.parameters
          ? JSON.stringify(error?.parameters)
          : "pas de paramètres"
      }`;

      throw new Error(`${message}\n${messageParametres}`);
    }
    return errorType;
  }

  private buildCacheKey(httpRequestConfig: HttpRequestConfig) {
    const parameters = httpRequestConfig.parameters;
    let cacheKey = `${httpRequestConfig.method}.${httpRequestConfig.uri}`;
    if (parameters) {
      cacheKey = `${cacheKey}.${JSON.stringify(parameters)}`;
    }
    return cacheKey;
  }

  private addIdCorrelationToConfigHeader(config: HttpRequestConfig) {
    if (!config.headers) {
      config.headers = [];
    }
    config.headers[config.headers.length] = {
      header: ID_CORRELATION_HEADER_NAME,
      value: Generateur.genereCleUnique()
    };
  }

  private addCsrfInfosToConfigHeader(config: HttpRequestConfig) {
    if (!config.headers) {
      config.headers = [];
    }
    config.headers[config.headers.length] = getCsrfHeader();
  }

  public processRequestHeaders(
    httpRequest: superagent.SuperAgentRequest,
    headers?: HttpRequestHeader[]
  ): superagent.SuperAgentRequest {
    let res = httpRequest;
    headers?.forEach(element => {
      res = httpRequest.set(element.header, element.value);
    });
    res = httpRequest.set("Content-Type", "application/json");
    return res;
  }

  public processRequestQueyParameters(
    parameters: any,
    httpRequest: superagent.SuperAgentRequest
  ) {
    return httpRequest.query(parameters);
  }

  public processRequestData(
    data: any,
    httpRequest: superagent.SuperAgentRequest
  ): superagent.SuperAgentRequest {
    return httpRequest.send(data);
  }

  public processRequestMethod(
    method: HttpMethod,
    uri: string
  ): superagent.SuperAgentRequest {
    let res: superagent.SuperAgentRequest;
    switch (method) {
      case HttpMethod.GET:
        res = superagent.get(this.getUri() + uri);
        break;
      case HttpMethod.DELETE:
        res = superagent.delete(this.getUri() + uri);
        break;
      case HttpMethod.PATCH:
        res = superagent.patch(this.getUri() + uri);
        break;
      case HttpMethod.PUT:
        res = superagent.put(this.getUri() + uri);
        break;
      case HttpMethod.POST:
        res = superagent.post(this.getUri() + uri);
        break;
    }
    return res;
  }
}
