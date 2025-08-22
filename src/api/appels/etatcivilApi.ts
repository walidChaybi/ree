import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { AddAlerteActeApiHookParameters } from "@hook/alertes/AddAlerteActeHookApi";
import { DeleteAlerteActeApiHookParameters } from "@hook/alertes/DeleteAlerteActeHookApi";
import { IDerniereDelivranceRcRcaPacsParams } from "@hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { TModeAuthentification } from "@model/agent/types";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { IActeInscriptionSauvegardeDto } from "../../dto/etatcivil/acte/actesInscriptionsSauvegardes/IActeInscriptionSauvegardeDto";
import { HttpMethod } from "../ApiManager";
import { StatutMention } from "./../../model/etatcivil/enum/StatutMention";

async function getApiManager() {
  const { ApiManager } = await import("../ApiManager");
  return ApiManager.getInstance("rece-etatcivil-api", "v1");
}

const URL_ACTE = "/acte";
const URL_TITULAIRE = "/titulaire";
const URL_RESUME = "/resume";
const URL_ETAT_CIVIL = "/repertoirecivil";
// Utilisé pour visualiser les images de l'acte dans la fiche Acte (renvoie un "InputStreamResource")
const URL_CORPS_IMAGE = "/corps-image";
const URL_DONNEES_POUR_COMPOSITION_ACTE_TEXTE = "/donnees-pour-composition-acte-texte";
const URL_DONNEES_POUR_COMPOSITION_ACTE_REPRIS = "/donnees-pour-composition-acte-repris";
const URL_DONNEES_POUR_COMPOSITION_ACTE_AVANT_SIGNATURE_MENTIONS = "/donnees-pour-composition-acte-texte-mis-a-jour";
const URL_POCOPAS_DEBUTENT_PAR = "/acte/pocopas/debutentPar";
export const URL_MENTION = "/mentions";
const URL_CORPS_TEXTE = "/corpstexte";
const URL_ALERTES_ACTE = "/alertes";
const URL_ALERTE_ACTE = "/alerte";
const URL_DERNIERE_DELIVRANCE_RC_RCA_PACS = "/repertoirecivil/datedernieredelivrance";
const URL_SAISIE_EXTRAIT = "/saisieExtrait";
const URL_PERSONNES = "/personnes";
const URL_RC = "/rc";
const URL_PERSONNES_RMC_AUTO = "/personnes/rmcauto";
const URL_PROJET_ACTE = "/projetacte";
const URL_ETABLI = "/etabli";
const URL_PROJET_ACTE_INSCRIPTION_LISTE = "/projetacte/actesinscriptionssauvegardes";
const URL_ANALYSE_MARGINALE = "/analyseMarginale";
const URL_BULLETIN_IDENTIFICATION = "/bulletinIdentification";
const URL_COMPOSER_DOCUMENT_FINAL = "/composer-document-final";
const URL_REGISTRE_PAPIER_PROJET_ACTE = "/registre-papier";
const URL_INTEGRER_ACTE_SIGNE = "/integrer-acte-signe";
const URL_ACTE_RECOMPOSER_APRES_SIGNATURE = "/recomposer-document-final";

/**
 * Récupération des informations des Fiches RC/RCA/PACS (répertoires) et Acte (Registre)
 */
export function getInformationsFiche(typeFiche: ETypeFiche, identifiant: string): Promise<any> {
  if (typeFiche === ETypeFiche.ACTE) {
    return getInformationsFicheActe(identifiant, false, false);
  } else {
    return getInformationsFicheRepertoire(typeFiche, identifiant);
  }
}

export function getActesInscriptionsSauvegardes(actesInscriptionsSauvegardes: IActeInscriptionSauvegardeDto[]): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_PROJET_ACTE_INSCRIPTION_LISTE}`,
      data: actesInscriptionsSauvegardes
    })
  );
}

/**
 * Recuperation d'un projet d'acte'
 */
export function getProjetActe(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_PROJET_ACTE}/${idActe}`
    })
  );
}

/**
 * Envoi d'un projet d'acte pour enregistrement'
 */
export function postProjetActe(acte: IProjetActe): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_PROJET_ACTE}${URL_ETABLI}`,
      data: acte
    })
  );
}

/**
 * Envoi d'un projet d'acte pour modification'
 */
export function patchProjetActe(acte: IProjetActe): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_PROJET_ACTE}`,
      data: acte
    })
  );
}

/**
 * Composition d'un projet d'acte final à signer.
 */
export function composerDocumentFinal(idActe: string, issuerCertificat: string, entiteCertificat: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_PROJET_ACTE}/${idActe}${URL_COMPOSER_DOCUMENT_FINAL}`,
      data: {
        infosSignature: {
          issuerCertificat,
          entiteCertificat
        }
      }
    })
  );
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
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_PROJET_ACTE}/${idActe}${URL_INTEGRER_ACTE_SIGNE}`,
      data: {
        documentPadesBase64: document,
        signature: { infosSignature: infosCarteSignature },
        modeAuthentification
      }
    })
  );
}

/**
 * Récupérer le registre papier qui sera associé à un projet d'acte.
 */
export function getRegistrePapierParIdProjetActe(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_PROJET_ACTE}/${idActe}${URL_REGISTRE_PAPIER_PROJET_ACTE}`
    })
  );
}

/**
 * Récupération des informations des Fiches RC/RCA/PACS
 */
function getInformationsFicheRepertoire(typeFiche: ETypeFiche, identifiant: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ETAT_CIVIL}/${typeFiche.toLowerCase()}/${identifiant}`
    })
  );
}

/**
 * Récupération des informations des Fiches ACTE
 */
export function getInformationsFicheActe(
  identifiant: string,
  recupereImagesEtTexte = false,
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

  return getApiManager().then(api => api.fetch(config));
}

/**
 * Récupération des titulaires d'un ACTE
 */
export function getTitulairesActe(identifiant: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${identifiant}${URL_TITULAIRE}`
    })
  );
}

export function getInscriptionsRC(identifiant: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_PERSONNES}/${identifiant}${URL_RC}`
    })
  );
}

export function rechercheMultiCriteresPersonne(criteres: IRMCAutoPersonneRequest, range?: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_PERSONNES_RMC_AUTO}`,
      data: criteres,
      parameters: {
        range
      }
    })
  );
}

export function getPersonnesSauvegardees(idPersonnes: string[]): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_PERSONNES}`,
      data: idPersonnes
    })
  );
}

/** Utilisé pour visualiser les images de l'acte dans la fiche Acte (renvoie un "InputStreamResource")*/
export function getCorpsActeImage(identifiant: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${identifiant}${URL_CORPS_IMAGE}`
    })
  );
}

export function getDonneesPourCompositionActeTexte(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_DONNEES_POUR_COMPOSITION_ACTE_TEXTE}`
    })
  );
}

export function getDonneesPourCompositionActeRepris(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_DONNEES_POUR_COMPOSITION_ACTE_REPRIS}`
    })
  );
}

export function getDonneesPourCompositionActeAvantSignatureMentions(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_DONNEES_POUR_COMPOSITION_ACTE_AVANT_SIGNATURE_MENTIONS}`
    })
  );
}

export function getPocopasParFamille(debutPocopa: string, familleRegistre: string, nombreResultatsMax: number): Promise<any> {
  return getApiManager().then(api =>
    api.fetchCache({
      method: HttpMethod.GET,
      uri: URL_POCOPAS_DEBUTENT_PAR,
      parameters: {
        debutPocopa,
        familleRegistre,
        nombreResultatsMax
      }
    })
  );
}

export function getPocopasOuvertsOuFermerParFamille(
  debutPocopa: string,
  familleRegistre: string,
  nombreResultatsMax: number,
  estOuvert?: boolean
): Promise<any> {
  return getApiManager().then(api =>
    api.fetchCache({
      method: HttpMethod.GET,
      uri: URL_POCOPAS_DEBUTENT_PAR,
      parameters: {
        debutPocopa,
        familleRegistre,
        nombreResultatsMax,
        estOuvert
      }
    })
  );
}

export async function getMentions(idActe: string, statutMention?: StatutMention): Promise<any> {
  const queryParams = statutMention !== undefined ? { statut: StatutMention[statutMention] } : undefined;
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_MENTION}`,
      parameters: queryParams
    })
  );
}

export async function postMentions(idActe: string, mentions: any[]): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}/${idActe}${URL_MENTION}`,
      data: mentions
    })
  );
}

export async function postCorpsTexte(idActe: string, corpsExtrait: string, type: TypeExtrait): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}/${idActe}${URL_CORPS_TEXTE}`,
      parameters: { type: type.nom },
      data: { corpsExtrait }
    })
  );
}

export function getAlertesActe(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_ALERTES_ACTE}`
    })
  );
}

export function addAlerteActe(parameters: AddAlerteActeApiHookParameters): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}${URL_ALERTE_ACTE}`,
      data: {
        idActe: parameters?.idActe,
        idTypeAlerte: parameters?.idTypeAlerte,
        complementDescription: parameters?.complementDescription
      }
    })
  );
}

export function deleteAlerteActe(parameters: DeleteAlerteActeApiHookParameters): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.DELETE,
      uri: `${URL_ACTE}${URL_ALERTE_ACTE}/${parameters?.idAlerteActe}`
    })
  );
}

export function updateDateDerniereDelivranceRcRcaPacs(body: IDerniereDelivranceRcRcaPacsParams[]): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_DERNIERE_DELIVRANCE_RC_RCA_PACS}`,
      data: body
    })
  );
}

export function majEtatCivilSuiteSaisieExtrait(idActe: string, extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer) {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_ACTE}/${idActe}${URL_SAISIE_EXTRAIT}`,
      data: extraitSaisiAEnvoyer
    })
  );
}

export function getTitulaireAnalyseMarginalByIdActe(identifiantsActes: string[]): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}${URL_ANALYSE_MARGINALE}`,
      data: identifiantsActes
    })
  );
}

export function getBulletinIdentificationByIdActe(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}${URL_BULLETIN_IDENTIFICATION}/${idActe}`
    })
  );
}

export function getActeRecomposerApresSignature(idActe: string): Promise<any> {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_ACTE_RECOMPOSER_APRES_SIGNATURE}`,
      responseType: "blob"
    })
  );
}
