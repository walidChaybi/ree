import { ApiManager, HttpMethod } from "../ApiManager";

const api = ApiManager.getInstance("rece-composition-api", "v1");

const URL_COMPOSITION_CARN_CSPAC_01 = "/composition/CARN_CSPAC_01/1";

function getCompositionReponseNegativeDemandeIncomplete(
  obj: any
): Promise<any> {
  return getComposition(URL_COMPOSITION_CARN_CSPAC_01, obj);
}

function getComposition(uri: string, data: any): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri,
    data
  });
}

export const compositionApi = {
  getCompositionReponseNegativeDemandeIncomplete
};
