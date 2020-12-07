import { HttpMethod, ApiManager } from "../ApiManager";
const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ETAT_CIVIL = "/repertoirecivil";

export function getInformationsFiche(
  categorie: string,
  identifiant: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ETAT_CIVIL}/${categorie}/${identifiant}`
  });
}
