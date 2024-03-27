import { IMentionEnregistree } from "@hook/acte/EnregistrerMentionsApiHook";
import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { AddAlerteActeApiHookParameters } from "@hook/alertes/AddAlerteActeHookApi";
import { DeleteAlerteActeApiHookParameters } from "@hook/alertes/DeleteAlerteActeHookApi";
import { IDerniereDelivranceRcRcaPacsParams } from "@hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { TModeAuthentification } from "@model/agent/types";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import {
  ICriteresRMCAutoActeInscription,
  IRMCRequestActesInscriptions
} from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { IActeInscriptionSauvegardeDto } from "../../dto/etatcivil/acte/actesInscriptionsSauvegardes/IActeInscriptionSauvegardeDto";
import { ApiManager, HttpMethod } from "../ApiManager";
import { StatutMention } from "./../../model/etatcivil/enum/StatutMention";

const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export const URL_ACTE = "/acte";
export const URL_TITULAIRE = "/titulaire";
export const URL_RESUME = "/resume";
export const URL_COUNT_TITULAIRE = "/count/titulaire";
export const URL_ETAT_CIVIL = "/repertoirecivil";
export const URL_ETAT_CIVIL_RMC = "/repertoirecivil/rmc";
export const URL_ACTE_RMC = "/acte/rmc";
// Utilisé pour visualiser les images de l'acte dans la fiche Acte (renvoie un "InputStreamResource")
export const URL_CORPS_IMAGE = "/corps-image";
export const URL_ACTE_IMAGES = "/acteimage/images";
export const URL_DONNEES_POUR_COMPOSITION_ACTE_TEXTE =
  "/donnees-pour-composition-acte-texte";
const URL_DONNEES_POUR_COMPOSITION_ACTE_REPRIS =
  "/donnees-pour-composition-acte-repris";
const URL_DONNEES_POUR_COMPOSITION_ACTE_AVANT_SIGNATURE_MENTIONS =
  "/donnees-pour-composition-acte-texte-mis-a-jour";
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
export const URL_LISTE_PERSONNE = "/personne/listePersonne";
export const URL_PROJET_ACTE = "/projetacte";
export const URL_PROJET_ACTE_INSCRIPTION_LISTE =
  "/projetacte/actesinscriptionssauvegardes";
export const URL_ANALYSE_MARGINALE = "/analyseMarginale";
export const URL_BULLETIN_IDENTIFICATION = "/bulletinIdentification";
const URL_COMPOSER_DOCUMENT_FINAL = "/composer-document-final";
const URL_REGISTRE_PAPIER_PROJET_ACTE = "/registre-papier";
const URL_INTEGRER_ACTE_SIGNE = "/integrer-acte-signe";
const URL_ACTE_RECOMPOSER_APRES_SIGNATURE = "/recomposer-document-final";
const URL_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES =
  "/composer-document-mentions-ulterieures";

/**
 * Récupération des informations des Fiches RC/RCA/PACS (répertoires) et Acte (Registre)
 */
export function getInformationsFiche(
  typeFiche: TypeFiche,
  identifiant: string,
  estConsultation = false
): Promise<any> {
  if (typeFiche === TypeFiche.ACTE) {
    return getInformationsFicheActe(identifiant, false, estConsultation, false);
  } else {
    return getInformationsFicheRepertoire(typeFiche, identifiant);
  }
}

export function getActesInscriptionsSauvegardes(
  actesInscriptionsSauvegardes: IActeInscriptionSauvegardeDto[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_PROJET_ACTE_INSCRIPTION_LISTE}`,
    data: actesInscriptionsSauvegardes
  });
}

/**
 * Recuperation d'un projet d'acte'
 */
export function getProjetActe(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_PROJET_ACTE}/${idActe}`
  });
}

/**
 * Envoi d'un projet d'acte pour enregistrement'
 */
export function postProjetActe(acte: IProjetActe): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_PROJET_ACTE}`,
    data: acte
  });
}

/**
 * Envoi d'un projet d'acte pour modification'
 */
export function patchProjetActe(acte: IProjetActe): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_PROJET_ACTE}`,
    data: acte
  });
}

/**
 * Composition d'un projet d'acte final à signer.
 */
export function composerDocumentFinal(
  idActe: string,
  issuerCertificat: string,
  entiteCertificat: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_PROJET_ACTE}/${idActe}${URL_COMPOSER_DOCUMENT_FINAL}`,
    data: {
      infosSignature: {
        issuerCertificat,
        entiteCertificat
      }
    }
  });
}

/**
 * Enregistrer l'acte final signé.
 */
export function integrerActeSigne(
  idActe: string,
  document: string,
  infosCarteSignature: IInfosCarteSignature,
  modeAuthentification: TModeAuthentification
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_PROJET_ACTE}/${idActe}${URL_INTEGRER_ACTE_SIGNE}`,
    data: {
      documentPadesBase64: document,
      signature: { infosSignature: infosCarteSignature },
      modeAuthentification
    }
  });
}

/**
 * Composition du document mention final à signer.
 */
export function composerDocumentMentionsUlterieures(
  idActe: string,
  issuerCertificat: string,
  entiteCertificat: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_ACTE}/${idActe}${URL_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES}`,
    data: {
      infosSignature: {
        issuerCertificat,
        entiteCertificat
      }
    }
  });
}

/**
 * Récupérer le registre papier qui sera associé à un projet d'acte.
 */
export function getRegistrePapierParIdProjetActe(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_PROJET_ACTE}/${idActe}${URL_REGISTRE_PAPIER_PROJET_ACTE}`
  });
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
  estConsultation = false,
  remplaceIdentiteTitulaireParIdentiteTitulaireAM = true
): Promise<any> {
  const config: any = {
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${identifiant}${URL_RESUME}`,
    parameters: {
      remplaceIdentiteTitulaireParIdentiteTitulaireAM
    }
  };
  if (recupereImagesEtTexte) {
    config.parameters = {
      ...config.parameters,
      recupereImagesEtTexte
    };
  }
  if (estConsultation) {
    config.parameters = {
      ...config.parameters,
      isConsultation: estConsultation
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

export function getPersonnesSauvegardees(idPersonnes: string[]): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_LISTE_PERSONNE}`,
    parameters: { ids: idPersonnes }
  });
}

/** Utilisé pour visualiser les images de l'acte dans la fiche Acte (renvoie un "InputStreamResource")*/
export function getCorpsActeImage(identifiant: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${identifiant}${URL_CORPS_IMAGE}`,
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

export function getDonneesPourCompositionActeTexte(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_DONNEES_POUR_COMPOSITION_ACTE_TEXTE}`
  });
}

export function getDonneesPourCompositionActeRepris(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_DONNEES_POUR_COMPOSITION_ACTE_REPRIS}`
  });
}

export function getDonneesPourCompositionActeAvantSignatureMentions(
  idActe: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_DONNEES_POUR_COMPOSITION_ACTE_AVANT_SIGNATURE_MENTIONS}`
  });
}

export function getPocopasParFamille(
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

export function getPocopasOuvertsOuFermerParFamille(
  debutPocopa: string,
  familleRegistre: string,
  nombreResultatsMax: number,
  estOuvert?: boolean
): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: URL_POCOPAS_DEBUTENT_PAR,
    parameters: {
      debutPocopa,
      familleRegistre,
      nombreResultatsMax,
      estOuvert
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

export async function getMentions(
  idActe: string,
  statutMention?: StatutMention
): Promise<any> {
  const queryParams =
    statutMention !== undefined
      ? { statut: StatutMention[statutMention] }
      : undefined;
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_MENTION}`,
    parameters: queryParams
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

export async function enregistrerMentions(
  idActe: string,
  mentions: IMentionEnregistree[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PUT,
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

export function getTitulaireAnalyseMarginalByIdActe(
  identifiantsActes: string[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTE}${URL_ANALYSE_MARGINALE}`,
    data: identifiantsActes
  });
}

export function getBulletinIdentificationByIdActe(
  idActe: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}${URL_BULLETIN_IDENTIFICATION}/${idActe}`
  });
}

export function getActeRecomposerApresSignature(idActe: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_ACTE}/${idActe}${URL_ACTE_RECOMPOSER_APRES_SIGNATURE}`,
    responseType: "blob"
  });
}
