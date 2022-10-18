import { ApiManager, HttpMethod } from "@api/ApiManager";

const URL_CTV = "/televerifications/ctv";
const URL_SAUVEGARDER_CTV = "/televerifications/generer";

const api = ApiManager.getInstance("rece-televerification-api", "v1");

export function getCodeCtv(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_CTV}`
  });
}

export function saveCodeCtv(ctv: string, idDocument: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_CTV}/${ctv}/${idDocument}`
  });
}

export function sauvegarderDocuments(data: any): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_SAUVEGARDER_CTV}`,
    data
  });
}
