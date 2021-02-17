import { IRMCRequest } from "../../model/rmc/envoi/IRMCRequest";
import { HttpMethod, ApiManager } from "../ApiManager";
const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ETAT_CIVIL = "/repertoirecivil";
export const URL_ACTE = "/acte";

export function getInformationsFiche(
  categorie: string,
  identifiant: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ETAT_CIVIL}/${categorie}/${identifiant}`
  });
}

export function rechercheMultiCriteresActes(
  criteres: IRMCRequest
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE}/rmc`,
    data: criteres
  });
}

export function rechercheMultiCriteresInscriptions(
  criteres: IRMCRequest
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ETAT_CIVIL}/rmc`,
    data: criteres
  });
}
