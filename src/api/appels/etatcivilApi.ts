import { IRMCRequest } from "../../model/rmc/acteInscription/envoi/IRMCRequest";
import { ApiManager, HttpMethod } from "../ApiManager";

const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ETAT_CIVIL = "/repertoirecivil";
export const URL_ACTE = "/acte";
export const URL_ETAT_CIVIL_RMC = "/repertoirecivil/rmc";
export const URL_ACTE_RMC = "/acte/rmc";
export const URL_ACTE_IMAGE = "/repertoirecivil/acte/corps";
export const URL_POCOPAS_DEBUTENT_PAR = "/acte/pocopas/debutentPar";
export const URL_NOMENCLATURE = "/nomenclature";

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
    uri: `${URL_ACTE_RMC}`,
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
    uri: `${URL_ETAT_CIVIL_RMC}`,
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

export function getPocopas(
  debutPocopa: string,
  familleRegistre: string,
  nombreResultatsMax: number
): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: URL_POCOPAS_DEBUTENT_PAR,
    parameters: {
      debutPocopa,
      familleRegistre,
      nombreResultatsMax
    }
  });
}

export async function getNomenclatureEtatCivil(
  categorie: string
): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}/${categorie}`
  });
}
