const apis: IApis = require("../../ressources/api.json");

interface IApi {
  url: string;
  ports: number;
  name: string;
  version: string[];
}

interface IApis {
  apis: IApi[];
}

export class ApiManager {
  public url: string;
  public ports: number;
  public name: string;
  public version: string;
  private static instance: ApiManager;

  private constructor(
    name: "rece-verificationctv-api" | "rece-default-api",
    version: string
  ) {
    const foundApis: IApi[] = apis.apis.filter(
      (api: IApi) => api.name === name
    );
    if (foundApis.length === 1) {
      const versionTrouve: string[] = foundApis[0].version.filter(
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

  public static getInstance(
    name: "rece-verificationctv-api" | "rece-default-api",
    version: string
  ): ApiManager {
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
}
