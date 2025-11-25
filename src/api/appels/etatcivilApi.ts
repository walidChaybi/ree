import { TModeAuthentification } from "@model/agent/types";
import { IActeInscriptionSauvegardeDto } from "@model/etatcivil/acte/IActeInscriptionSauvegardeDto";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ETypeExtrait } from "@model/etatcivil/enum/ETypeExtrait";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { EStatutMention } from "../../model/etatcivil/enum/EStatutMention";
import { IExtraitSaisiAEnvoyer } from "../../views/common/hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { IMentionMiseAJourDto } from "../../views/common/hook/acte/mentions/MiseAJourMentionsApiHook";
import { AddAlerteActeApiHookParameters } from "../../views/common/hook/alertes/AddAlerteActeHookApi";
import { DeleteAlerteActeApiHookParameters } from "../../views/common/hook/alertes/DeleteAlerteActeHookApi";
import { IDerniereDelivranceRcRcaPacsParams } from "../../views/common/hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { HttpMethod } from "../ApiManager";

const getApiManager = async () => {
  const { ApiManager } = await import("../ApiManager");
  return ApiManager.getInstance("rece-etatcivil-api", "v1");
};

const URL_ACTE = "/acte";
export const URL_MENTION = "/mentions";
const URL_CORPS_TEXTE = "/corpstexte";
const URL_ALERTES_ACTE = "/alertes";
const URL_ALERTE_ACTE = "/alerte";
const URL_DERNIERE_DELIVRANCE_RC_RCA_PACS = "/repertoirecivil/datedernieredelivrance";
const URL_SAISIE_EXTRAIT = "/saisieExtrait";
const URL_PROJET_ACTE = "/projetacte";
const URL_ETABLI = "/etabli";
const URL_PROJET_ACTE_INSCRIPTION_LISTE = "/projetacte/actesinscriptionssauvegardes";
const URL_ANALYSE_MARGINALE = "/analyseMarginale";
const URL_BULLETIN_IDENTIFICATION = "/bulletinIdentification";
const URL_COMPOSER_DOCUMENT_FINAL = "/composer-document-final";
const URL_REGISTRE_PAPIER_PROJET_ACTE = "/registre-papier";
const URL_INTEGRER_ACTE_SIGNE = "/integrer-acte-signe";

export const getActesInscriptionsSauvegardes = (actesInscriptionsSauvegardes: IActeInscriptionSauvegardeDto[]): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_PROJET_ACTE_INSCRIPTION_LISTE}`,
      data: actesInscriptionsSauvegardes
    })
  );
};

/**
 * Recuperation d'un projet d'acte'
 */
export const getProjetActe = (idActe: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_PROJET_ACTE}/${idActe}`
    })
  );
};

/**
 * Envoi d'un projet d'acte pour enregistrement'
 */
export const postProjetActe = (acte: IProjetActe): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_PROJET_ACTE}${URL_ETABLI}`,
      data: acte
    })
  );
};

/**
 * Envoi d'un projet d'acte pour modification'
 */
export const patchProjetActe = (acte: IProjetActe): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_PROJET_ACTE}`,
      data: acte
    })
  );
};

/**
 * Composition d'un projet d'acte final à signer.
 */
export const composerDocumentFinal = (idActe: string, issuerCertificat: string, entiteCertificat: string): Promise<any> => {
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
};

/**
 * Enregistrer l'acte final signé.
 */
export const integrerActeSigne = (
  idActe: string,
  document: string,
  infosCarteSignature: IInfosCarteSignature,
  modeAuthentification: TModeAuthentification
): Promise<any> => {
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
};

/**
 * Récupérer le registre papier qui sera associé à un projet d'acte.
 */
export const getRegistrePapierParIdProjetActe = (idActe: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_PROJET_ACTE}/${idActe}${URL_REGISTRE_PAPIER_PROJET_ACTE}`
    })
  );
};

export const getMentions = async (idActe: string, statutMention?: EStatutMention): Promise<any> => {
  const queryParams = statutMention !== undefined ? { statut: EStatutMention[statutMention] } : undefined;
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_MENTION}`,
      parameters: queryParams
    })
  );
};

export const postMentions = (idActe: string, mentions: IMentionMiseAJourDto[]): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}/${idActe}${URL_MENTION}`,
      data: mentions
    })
  );
};

export const postCorpsTexte = async (idActe: string, corpsExtrait: string, type: keyof typeof ETypeExtrait): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}/${idActe}${URL_CORPS_TEXTE}`,
      parameters: { type },
      data: { corpsExtrait }
    })
  );
};

export const getAlertesActe = (idActe: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}/${idActe}${URL_ALERTES_ACTE}`
    })
  );
};

export const addAlerteActe = (parameters: AddAlerteActeApiHookParameters): Promise<any> => {
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
};

export const deleteAlerteActe = (parameters: DeleteAlerteActeApiHookParameters): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.DELETE,
      uri: `${URL_ACTE}${URL_ALERTE_ACTE}/${parameters?.idAlerteActe}`
    })
  );
};

export const updateDateDerniereDelivranceRcRcaPacs = (body: IDerniereDelivranceRcRcaPacsParams[]): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_DERNIERE_DELIVRANCE_RC_RCA_PACS}`,
      data: body
    })
  );
};

export const majEtatCivilSuiteSaisieExtrait = (idActe: string, extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_ACTE}/${idActe}${URL_SAISIE_EXTRAIT}`,
      data: extraitSaisiAEnvoyer
    })
  );
};

export const getTitulaireAnalyseMarginalByIdActe = (identifiantsActes: string[]): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTE}${URL_ANALYSE_MARGINALE}`,
      data: identifiantsActes
    })
  );
};

export const getBulletinIdentificationByIdActe = (idActe: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_ACTE}${URL_BULLETIN_IDENTIFICATION}/${idActe}`
    })
  );
};
