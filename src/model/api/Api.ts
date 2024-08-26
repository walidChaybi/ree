import { TCodesFct } from "@api/TCodesFct";
import { TCodesTech } from "@api/TCodesTech";

export type TApiAutorisee =
  | "rece-agent-api"
  | "rece-requete-api"
  | "rece-outiltech-api";
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
};

export type TConfigurationRequeteHttp<
  TUri extends TBaseUri,
  TBody extends object | undefined,
  TQuery extends object | undefined
> = {
  uri: TUri;
  methode: TMethodeHttp;
  query?: TQuery;
  path?: ExtraireParametresUri<TUri>;
  body?: TBody;
  headers?: THeader;
  responseType?: "blob";
};

export type TApi = { nom: TApiAutorisee; version: string };

export type TBaseUri = `/${string}`;

// Type non utilisés dans la déclaration mais nécéssaire lors de l'utilisation.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TConfigurationApi<
  TUri extends TBaseUri,
  TBody extends object | undefined = undefined,
  TQuery extends object | undefined = undefined,
  TResultat extends object | unknown = unknown
> = {
  api: TApi;
  methode: TMethodeHttp;
  uri: TUri;
};

export type TAppelApi<
  TUri extends TBaseUri,
  TBody extends object | undefined,
  TQuery extends object | undefined,
  TResultat extends object | unknown
> = Omit<
  TConfigurationRequeteHttp<TUri, TBody, TQuery>,
  "uri" | "methode" | "path" | "body" | "query"
> & {
  parametres?: TParametres<TUri, TBody, TQuery>;
  apresSucces?: (data: TResultat, headers: THeader) => void;
  apresErreur?: (erreurs: TErreurApi[]) => void;
  finalement?: () => void;
};

type TParametres<
  TUri extends TBaseUri,
  TBody extends object | undefined,
  TQuery extends object | undefined
> = {
  path?: ExtraireParametresUri<TUri>;
  body?: TBody;
  query?: TQuery;
};

type ExtraireParametresUri<Uri extends TBaseUri> =
  Uri extends `${string}/:${infer Param1}/${infer Reste}`
    ? { [Cle in Param1]: string } & ExtraireParametresUri<`/${Reste}`>
    : Uri extends `${string}/:${infer Param2}`
    ? { [Cle in Param2]: string }
    : {};
