import { configEtatcivil } from "../mock/superagent-config/superagent-mock-etatcivil";
import * as superagent from "superagent";
import request from "superagent";
import messageManager from "../views/common/util/messageManager";
import { configAgent } from "../mock/superagent-config/superagent-mock-agent";
import { configRequetes } from "../mock/superagent-config/superagent-mock-requetes";
import { getCsrfHeader } from "../views/common/util/CsrfUtil";

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
  | "rece-etatcivil-api";

interface IApi {
  url: string;
  ports: number;
  domain: string;
  name: string;
  usedVersions: string[];
}

interface IApis {
  apis: IApi[];
}

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

const DEFAULT_PORT = 80;
const DOMAIN = "rece";

export class ApiManager {
  private readonly url: string;
  private readonly ports: number;
  private readonly domain: string;
  private readonly name: string;
  private readonly version: string;
  private static instance: ApiManager;

  private constructor(name: ApisAutorisees, version: string) {
    this.url = `${window.location.protocol}//${window.location.hostname}`;
    this.ports = DEFAULT_PORT;
    this.domain = DOMAIN;
    this.name = name;
    this.version = version;
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
    return `${this.url}:${this.ports}/${this.domain}/${this.name}/${this.version}`;
  }

  public fetch(httpRequestConfig: HttpRequestConfig): Promise<any> {
    const codeErreurForbidden = 403;

    let httpRequete = this.processRequestMethod(
      httpRequestConfig.method,
      httpRequestConfig.uri
    );

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

    if (httpRequestConfig.headers) {
      httpRequete = this.processRequestHeaders(
        httpRequestConfig.headers,
        httpRequete
      );
    }

    if (httpRequestConfig.responseType) {
      httpRequete = httpRequete.responseType(httpRequestConfig.responseType);
    }
    return httpRequete
      .then(response => {
        return Promise.resolve({
          body: response.body,
          status: response.status,
          headers: response.header
        });
      })
      .catch(error => {
        if (
          process.env.NODE_ENV === "development" &&
          error.status !== codeErreurForbidden
        ) {
          messageManager.showError(
            `Une erreur est survenue: ${error ? error.message : "inconnue"}`
          );
        }

        return Promise.reject(error);
      });
  }

  private addCsrfInfosToConfigHeader(config: HttpRequestConfig) {
    if (!config.headers) {
      config.headers = [];
    }
    config.headers[config.headers.length] = getCsrfHeader();
  }

  public processRequestHeaders(
    headers: HttpRequestHeader[],
    httpRequest: superagent.SuperAgentRequest
  ): superagent.SuperAgentRequest {
    let res = httpRequest;
    headers.forEach(element => {
      res = httpRequest.set(element.header, element.value);
    });
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
