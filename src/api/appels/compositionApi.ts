import { ApiManager, HttpMethod } from "../ApiManager";

const api = ApiManager.getInstance("rece-composition-api", "v1");

const URL_COMPOSITION_CARN_CSPAC_01 = "/composition/CARN_CSPAC_01/1";
const URL_COMPOSITION_CARN_CS_01 = "/composition/CARN_CS_01/1";
const URL_COMPOSITION_CERTIFICAT_SITUATION =
  "/composition/CERTIFICAT_SITUATION/1";
const URL_COMPOSITION_CERTIFICAT_RCA =
  "/composition/CERTIFICAT_INSCRIPTION_RCA/1";

function getCompositionReponseNegativeDemandeIncomplete(
  obj: any
): Promise<any> {
  return getComposition(URL_COMPOSITION_CARN_CSPAC_01, obj);
}

function getCompositionReponseNegativeTraceMariage(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_CARN_CS_01, obj);
}

function getCompositionCertificatSituation(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_CERTIFICAT_SITUATION, obj);
}

function getCompositionCertificatRCA(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_CERTIFICAT_RCA, obj);
}

function getComposition(
  uri: string,
  data: any
): // Renvoie le document en base64
Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri,
    data
  });
}

export const compositionApi = {
  getCompositionReponseNegativeDemandeIncomplete,
  getCompositionCertificatSituation,
  getCompositionReponseNegativeTraceMariage,
  getCompositionCertificatRCA
};
