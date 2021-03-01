import { IRMCRequest } from "../../model/rmc/envoi/IRMCRequest";
import { HttpMethod, ApiManager } from "../ApiManager";
const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ETAT_CIVIL = "/repertoirecivil";
export const URL_ACTE = "/acte";
export const URL_ACTE_IMAGE = "/repertoirecivil/acte/corps";

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
  criteres: IRMCRequest,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE}/rmc`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function rechercheMultiCriteresInscriptions(
  criteres: IRMCRequest,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ETAT_CIVIL}/rmc`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function getImagesActe(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE_IMAGE}/${identifiant}`,
    responseType: "blob"
  });
}
