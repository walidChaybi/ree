import { TCodesFct } from "@api/TCodesFct";
import { TCodesTech } from "@api/TCodesTech";

export type TApiAutorisee =
  | "rece-agent-api"
  | "rece-requete-api"
  | "rece-outiltech-api"
  | "rece-etatcivil-api"
  | "rece-composition-api"
  | "rece-televerification-api"
  | "https://geo.api.gouv.fr"
  | "https://data.geopf.fr";

export type TMethodeHttp = "GET" | "DELETE" | "PATCH" | "POST" | "PUT";

type TErreurApiTech = {
  type: "TechnicalException";
  code: TCodesTech;
};

type TErreurApiFct = {
  type: "BusinessException";
  code: TCodesFct;
};

export type TErreurApi = {
  message: string;
  statut?: number;
} & (TErreurApiFct | TErreurApiTech);

export type THeader = {
  [cle: string]: string;
};

type TReponseApi = {
  status: number;
};

export type TReponseApiSucces<TResultat> = TReponseApi & {
  data: TResultat;
  avertissements: TErreurApi[];
  headers: THeader;
};

export type TReponseApiEchec = TReponseApi & {
  erreurs: TErreurApi[];
  statut?: number;
};

export type TConfigurationRequeteHttp<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined> = {
  uri: TUri;
  methode: TMethodeHttp;
  query?: TQuery;
  path?: ExtraireParametresUri<TUri>;
  body?: TBody;
  headers?: THeader;
  responseType?: "blob";
};

export type TApi = { nom: TApiAutorisee; version: string; estExterne?: boolean };

export type TBaseUri = `/${string}`;

// Types non utilisés dans la déclaration mais nécéssaire lors de l'utilisation.
export type TConfigurationApi<
  TUri extends TBaseUri,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TBody extends object | undefined = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TQuery extends object | undefined = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TResultat = unknown
> = {
  api: TApi;
  methode: TMethodeHttp;
  uri: TUri;
  avecAxios?: boolean;
};

export type TAppelApi<
  TUri extends TBaseUri,
  TBody extends object | undefined,
  TQuery extends object | undefined,
  TResultat = unknown
> = Omit<TConfigurationRequeteHttp<TUri, TBody, TQuery>, "uri" | "methode" | "path" | "body" | "query"> & {
  parametres?: TParametres<TUri, TBody, TQuery>;
  apresSucces?: (data: TResultat, headers: THeader) => void;
  apresErreur?: (erreurs: TErreurApi[], statut?: number) => void;
  finalement?: () => void;
  forcerAppelsMultiples?: boolean;
};

export type TParametres<TUri extends TBaseUri, TBody extends object | undefined, TQuery extends object | undefined> = {
  path?: ExtraireParametresUri<TUri>;
  body?: TBody;
  query?: TQuery;
};

type ExtraireParametresUri<Uri extends TBaseUri> = Uri extends `${string}/:${infer Param1}/${infer Reste}`
  ? { [Cle in Param1]: string } & ExtraireParametresUri<`/${Reste}`>
  : Uri extends `${string}/:${infer Param2}`
    ? { [Cle in Param2]: string }
    : {};
