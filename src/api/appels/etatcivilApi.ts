import { TypeFiche } from "../../model/etatcivil/enum/TypeFiche";
import { IRMCRequestActesInscriptions } from "../../model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { AddAlerteActeApiHookParameters } from "../../views/common/hook/alertes/AddAlerteActeHookApi";
import { DeleteAlerteActeApiHookParameters } from "../../views/common/hook/alertes/DeleteAlerteActeHookApi";
import { ICriteresRMCAuto } from "../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import { ApiManager, HttpMethod } from "../ApiManager";

const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ACTE = "/acte";
export const URL_COUNT_TITULAIRE = "/count/titulaire";
export const URL_ETAT_CIVIL = "/repertoirecivil";
export const URL_ETAT_CIVIL_RMC = "/repertoirecivil/rmc";
export const URL_ACTE_RMC = "/acte/rmc";
export const URL_ACTE_IMAGE = "/acte/corps";
export const URL_ACTE_TEXTE = "/acte/texte";
export const URL_POCOPAS_DEBUTENT_PAR = "/acte/pocopas/debutentPar";
export const URL_NOMENCLATURE = "/nomenclature";
export const URL_ETAT_CIVIL_RMC_AUTO = "/repertoirecivil/rmcauto";
export const URL_ACTE_RMC_AUTO = "/acte/rmcauto";
export const URL_ALERTES_ACTE = "/alertes";
export const URL_ALERTE_ACTE = "/alerte";
export const URL_DECRETS = "/repertoirecivil/decrets";

/**
 * Récupération des informations des Fiches RC/RCA/PACS (répertoires) et Acte (Registre)
 */
export function getInformationsFiche(
  typeFiche: TypeFiche,
  identifiant: string
): Promise<any> {
  if (typeFiche === TypeFiche.ACTE) {
    return getInformationsFicheActe(identifiant);
  } else {
    return getInformationsFicheRepertoire(typeFiche, identifiant);
  }
}

/**
 * Récupération des informations des Fiches RC/RCA/PACS
 */
export function getInformationsFicheRepertoire(
  typeFiche: TypeFiche,
  identifiant: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ETAT_CIVIL}/${typeFiche.toLowerCase()}/${identifiant}`
  });
}

/**
 * Récupération des informations des Fiches ACTE
 */
export function getInformationsFicheActe(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${identifiant}`
  });
}

/**
 * Récupération du nombre de titulaire d'un ACTE
 */
 export function getNbrTitulairesActe(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${identifiant}${URL_COUNT_TITULAIRE}`
  });
}

export function rechercheMultiCriteresActes(
  criteres: IRMCRequestActesInscriptions,
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
  criteres: IRMCRequestActesInscriptions,
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

export function getTexteActe(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE_TEXTE}/${identifiant}`,
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

export async function getNomenclatureEtatCivil(nom: string): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}/${nom}`
  });
}

export function rechercheMultiCriteresAutoActes(
  criteres: ICriteresRMCAuto,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE_RMC_AUTO}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function rechercheMultiCriteresAutoInscription(
  criteres: ICriteresRMCAuto,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ETAT_CIVIL_RMC_AUTO}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function getAlertesActe(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_ALERTES_ACTE}`
  });
}

export function addAlerteActe(
  parameters: AddAlerteActeApiHookParameters
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE}${URL_ALERTE_ACTE}`,
    data: {
      idActe: parameters?.idActe,
      idTypeAlerte: parameters?.idTypeAlerte,
      complementDescription: parameters?.complementDescription
    },
    parameters: {
      provenanceRequete: parameters?.provenanceRequete
    }
  });
}

export function deleteAlerteActe(
  parameters: DeleteAlerteActeApiHookParameters
): Promise<any> {
  return api.fetch({
    method: HttpMethod.DELETE,
    uri: `${URL_ACTE}${URL_ALERTE_ACTE}/${parameters?.idAlerteActe}`,
    parameters: {
      provenanceRequete: parameters?.provenanceRequete
    }
  });
}

export function getToutesLesDecrets(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_DECRETS}`
  });
}
