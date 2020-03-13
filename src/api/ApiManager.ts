import config from "./mock/superagent-mock-config";
import * as superagent from "superagent";
import request from "superagent";
const apis: IApis = require("../ressources/api.json");

// require("superagent-mock")(request, config);

type ApisAutorisees = "rece-requete-api" | "rece-auth-api";

interface IApi {
  url: string;
  ports: number;
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
        this.url = foundApis[0].url;
        this.ports = foundApis[0].ports;
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
    return `${this.url}:${this.ports}/${this.name}/${this.version}`;
  }

  public fetch(httpRequestConfig: HttpRequestConfig): Promise<any> {
    let request = this.processRequestMethod(
      httpRequestConfig.method,
      httpRequestConfig.uri
    );

    if (httpRequestConfig.parameters) {
      request = this.processRequestQueyParameters(
        httpRequestConfig.parameters,
        request
      );
    }

    if (httpRequestConfig.data) {
      request = this.processRequestData(httpRequestConfig.data, request);
    }

    if (httpRequestConfig.headers) {
      request = this.processRequestHeaders(httpRequestConfig.headers, request);
    }

    if (httpRequestConfig.responseType) {
      request = request.responseType(httpRequestConfig.responseType);
    }

    return request
      .then(response => {
        return Promise.resolve({
          body: response.body,
          status: response.status
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  public processRequestHeaders(
    headers: HttpRequestHeader[],
    request: superagent.SuperAgentRequest
  ): superagent.SuperAgentRequest {
    let res = request;
    headers.forEach(element => {
      res = request.set(element.header, element.value);
    });
    return res;
  }

  public processRequestQueyParameters(
    parameters: any,
    request: superagent.SuperAgentRequest
  ) {
    return request.query(parameters);
  }

  public processRequestData(
    data: any,
    request: superagent.SuperAgentRequest
  ): superagent.SuperAgentRequest {
    return request.send(data);
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
