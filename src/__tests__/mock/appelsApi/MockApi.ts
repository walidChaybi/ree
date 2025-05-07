import { TBaseUri, TConfigurationApi, TErreurApi, TParametres } from "@model/api/Api";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

type TReponseMock<TResultat> = {
  data?: TResultat;
  erreurs?: TErreurApi[];
  codeHttp?: number;
};

interface IParametresMock<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined>
  extends TParametres<TUri, TBody, TQuery> {
  regexp?: boolean;
}

export class MockApi {
  private static mock: AxiosMockAdapter | undefined;

  public static getMock() {
    MockApi.mock ??= new AxiosMockAdapter(axios, { onNoMatch: "throwException" });

    return MockApi.mock;
  }

  public static deployer<
    TUri extends TBaseUri,
    TBody extends object | undefined = undefined,
    TQuery extends object | undefined = undefined,
    TResultat = unknown
  >(
    config: TConfigurationApi<TUri, TBody, TQuery, TResultat>,
    parametres?: IParametresMock<TUri, TBody, TQuery>,
    reponse?: TReponseMock<TResultat>
  ) {
    const uriAvecParametres = MockApi.traitementParametresPathEtQuery(config, parametres);

    let onMethode: "onGet" | "onDelete" | "onPatch" | "onPost" | "onPut";
    switch (config.methode) {
      case "GET":
        onMethode = "onGet";
        break;
      case "POST":
        onMethode = "onPost";
        break;
      case "DELETE":
        onMethode = "onDelete";
        break;
      case "PATCH":
        onMethode = "onPatch";
        break;
      case "PUT":
        onMethode = "onPut";
        break;
    }

    MockApi.getMock()
      [onMethode](parametres?.regexp ? new RegExp(uriAvecParametres) : uriAvecParametres)
      .reply(reponse?.codeHttp ?? 200, reponse);

    return MockApi;
  }

  private static traitementParametresPathEtQuery<
    TUri extends TBaseUri,
    TBody extends object | undefined,
    TQuery extends object | undefined,
    TResultat = unknown
  >(config: TConfigurationApi<TUri, TBody, TQuery, TResultat>, parametres?: TParametres<TUri, TBody, TQuery>): string {
    const baseUri = ["http://localhost/rece", config.api.nom, config.api.version].join("/");

    if (!parametres) {
      return baseUri.concat(config.uri);
    }

    const uriAvecPathParams = Object.entries(parametres.path ?? {}).reduce(
      (uriGeneree, [cle, valeur]) => uriGeneree.replace(`:${cle}`, valeur as string) as TUri,
      config.uri
    );
    const query = Object.entries(parametres.query ?? {})
      .map(([cle, valeur]) => `${cle}=${valeur}`)
      .join("&");

    return `${baseUri}${uriAvecPathParams}${query ? "?".concat(query) : ""}` as TUri;
  }

  public static stopMock() {
    MockApi.mock?.reset();
  }

  public static mockToutAppel() {
    MockApi.getMock().onAny().passThrough();
  }

  public static debugAppels() {
    MockApi.getMock()
      .onAny()
      .reply(((config: any) => console.log(`[WARN] Appel non mockée : ${config.method} "${config.url}"`)) as any);
  }
}
