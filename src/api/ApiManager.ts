import config from "./mock/superagent-config/superagent-mock-fake-url";
import * as superagent from "superagent";
import request from "superagent";
import messageManager from "../views/common/util/messageManager";
const apis: IApis = require("../ressources/api.json");

if (process.env.REACT_APP_MOCK) {
  require("superagent-mock")(request, config);
}

type ApisAutorisees = "rece-requete-api" | "rece-securite-api";

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

interface HttpRequestHeader {
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

export class ApiManager {
  public url: string;
  public ports: number;
  public domain: string;
  public name: string;
  public version: string;
  private static instance: ApiManager;

  private constructor(name: ApisAutorisees, version: string) {
    const foundApis: IApi[] = apis.apis.filter(
      (api: IApi) => api.name === name
    );
    if (foundApis.length === 1) {
      const versionTrouve: string[] = foundApis[0].usedVersions.filter(
        (versionItem: string) => versionItem === version
      );
      if (versionTrouve.length === 1) {
        this.url =
          process.env.NODE_ENV !== "production"
            ? foundApis[0].url
            : `http://${window.location.hostname}`;
        this.ports = foundApis[0].ports;
        this.domain = foundApis[0].domain;
        this.name = foundApis[0].name;
        this.version = version;
      } else {
        throw Error(
          `La version ${version} donnée pour l'api ${name} n'est pas référencée. Vérifiez votre fichier api.json !`
        );
      }
    } else {
      throw Error(
        `Le nom d'Api ${name} n'a pas permis de trouver une api lui correspondant. Vérifiez votre fichier api.json !`
      );
    }
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
            "Une erreur est survenue: " + (error ? error.message : "inconnue")
          );
        }

        return Promise.reject(error);
      });
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
