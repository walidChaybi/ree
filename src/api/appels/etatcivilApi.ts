import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { AddAlerteActeApiHookParameters } from "@hook/alertes/AddAlerteActeHookApi";
import { DeleteAlerteActeApiHookParameters } from "@hook/alertes/DeleteAlerteActeHookApi";
import { IDerniereDelivranceRcRcaPacsParams } from "@hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import {
  ICriteresRMCAutoActeInscription,
  IRMCRequestActesInscriptions
} from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { ApiManager, HttpMethod } from "../ApiManager";

const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ACTE = "/acte";
export const URL_TITULAIRE = "/titulaire";
export const URL_RESUME = "/resume";
export const URL_COUNT_TITULAIRE = "/count/titulaire";
export const URL_ETAT_CIVIL = "/repertoirecivil";
export const URL_ETAT_CIVIL_RMC = "/repertoirecivil/rmc";
export const URL_ACTE_RMC = "/acte/rmc";
// Utilisé pour visualiser les images de l'acte dans la fiche Acte (renvoie un "InputStreamResource")
export const URL_ACTE_CORPS_IMAGE = "/acte/corps";
export const URL_ACTE_IMAGES = "/acteimage/images";
export const URL_ACTE_TEXTE = "/acte/texte";
export const URL_POCOPAS_DEBUTENT_PAR = "/acte/pocopas/debutentPar";
export const URL_NOMENCLATURE = "/nomenclature";
export const URL_MENTION = "/mentions";
export const URL_CORPS_TEXTE = "/corpstexte";
export const URL_ETAT_CIVIL_RMC_AUTO = "/repertoirecivil/rmcauto";
export const URL_ACTE_RMC_AUTO = "/acte/rmcauto";
export const URL_ALERTES_ACTE = "/alertes";
export const URL_TYPE_MENTION = "/typemention";
export const URL_ALERTE_ACTE = "/alerte";
export const URL_DECRETS = "/repertoirecivil/decrets";
export const URL_DERNIERE_DELIVRANCE = "/dernieredelivrance";
export const URL_DERNIERE_DELIVRANCE_RC_RCA_PACS =
  "/repertoirecivil/datedernieredelivrance";
export const URL_SAISIE_EXTRAIT = "/saisieExtrait";
export const URL_PERSONNE = "/personne";
export const URL_RC = "/rc";
export const URL_PERSONNE_RMC_AUTO = "/personne/rmcauto";
export const URL_POCOPAS = "/mespocopas";

/**
 * Récupération des informations des Fiches RC/RCA/PACS (répertoires) et Acte (Registre)
 */
export function getInformationsFiche(
  typeFiche: TypeFiche,
  identifiant: string,
  estConsultation = false
): Promise<any> {
  if (typeFiche === TypeFiche.ACTE) {
    return getInformationsFicheActe(identifiant, false, estConsultation);
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
export function getInformationsFicheActe(
  identifiant: string,
  recupereImagesEtTexte = false,
  estConsultation = false
): Promise<any> {
  let config: any = {
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${identifiant}${URL_RESUME}`
  };
  if (recupereImagesEtTexte) {
    config = {
      ...config,
      parameters: {
        recupereImagesEtTexte
      }
    };
  }
  if (estConsultation) {
    config = {
      ...config,
      parameters: {
        isConsultation: estConsultation
      }
    };
  }

  return api.fetch(config);
}

/**
 * Récupération des titulaires d'un ACTE
 */
export function getTitulairesActe(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${identifiant}${URL_TITULAIRE}`
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

export function getInscriptionsRC(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_PERSONNE}/${identifiant}${URL_RC}`
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

export function rechercheMultiCriteresPersonne(
  criteres: IRMCAutoPersonneRequest,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_PERSONNE_RMC_AUTO}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

/** Utilisé pour visualiser les images de l'acte dans la fiche Acte (renvoie un "InputStreamResource")*/
export function getImagesActe(identifiant: string): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_ACTE_CORPS_IMAGE}/${identifiant}`,
    responseType: "blob"
  });
}

/** Récupère les images d'un acte sous forme de tableau d'images base64 */
export function getImagesDeLActe(identifiantActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE_IMAGES}/${identifiantActe}`
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

export async function getTypesMention(): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}${URL_TYPE_MENTION}`
  });
}

export async function getMentions(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_MENTION}`
  });
}

export async function postMentions(
  idActe: string,
  mentions: any[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE}/${idActe}${URL_MENTION}`,
    data: mentions
  });
}

export async function postCorpsTexte(
  idActe: string,
  corpsExtrait: string,
  type: TypeExtrait
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE}/${idActe}${URL_CORPS_TEXTE}`,
    parameters: { type: type.nom },
    data: { corpsExtrait }
  });
}

export function rechercheMultiCriteresAutoActes(
  criteres: ICriteresRMCAutoActeInscription,
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
  criteres: ICriteresRMCAutoActeInscription,
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
    }
  });
}

export function deleteAlerteActe(
  parameters: DeleteAlerteActeApiHookParameters
): Promise<any> {
  return api.fetch({
    method: HttpMethod.DELETE,
    uri: `${URL_ACTE}${URL_ALERTE_ACTE}/${parameters?.idAlerteActe}`
  });
}

export function getToutesLesDecrets(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_DECRETS}`
  });
}

export function updateDateDerniereDelivranceActe(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_ACTE}/${idActe}${URL_DERNIERE_DELIVRANCE}`
  });
}

export function updateDateDerniereDelivranceRcRcaPacs(
  body: IDerniereDelivranceRcRcaPacsParams[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_DERNIERE_DELIVRANCE_RC_RCA_PACS}`,
    data: body
  });
}

export function majEtatCivilSuiteSaisieExtrait(
  idActe: string,
  extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer
) {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_ACTE}/${idActe}${URL_SAISIE_EXTRAIT}`,
    data: extraitSaisiAEnvoyer
  });
}

export function getPocopasAgent(): Promise<any> {
  const config: any = {
    method: HttpMethod.GET,
    uri: `${URL_ACTE}${URL_POCOPAS}`
  };
  return api.fetch(config);
}
