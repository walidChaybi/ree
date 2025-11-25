import { ApiManager, HttpMethod } from "@api/ApiManager";

const URL_CTV = "/televerifications/ctv";

const api = ApiManager.getInstance("rece-televerification-api", "v1");

export const getCodeCtv = (): Promise<any> => {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_CTV}`
  });
};

export const saveCodeCtv = (ctv: string, idDocument: string): Promise<any> => {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_CTV}/${ctv}/${idDocument}`
  });
};
