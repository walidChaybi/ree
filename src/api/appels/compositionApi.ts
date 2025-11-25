import { IContenuReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { IExtraitCopieComposition } from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ApiManager, HttpMethod } from "../ApiManager";

export interface ICompositionDto {
  contenu: string;
  nbPages: number;
}

const api = ApiManager.getInstance("rece-composition-api", "v1");

const URL_COMPOSITION_CERTIFICAT_SITUATION = "/composition/CERTIFICAT_SITUATION/1";
const URL_COMPOSITION_CERTIFICAT_RCA = "/composition/CERTIFICAT_INSCRIPTION_RCA/1";
const URL_COMPOSITION_CERTIFICAT_RC = "/composition/CERTIFICAT_INSCRIPTION_RC/1";

const URL_COMPOSITION_ATTESTATION_PACS = "/composition/ATTESTATION_PACS/1";
const URL_COMPOSITION_EXTRAIT_COPIE_ACTE_TEXTE = "/composition/EXTAIT_COPIE_ACTE_TEXTE/1";

const URL_COMPOSITION_COPIE_ACTE_IMAGE = "/composition/ACTE_IMAGE/1";
const URL_COMPOSITION_ACTE_TEXTE = "/composition/ACTE_TEXTE/1";

const URL_COMPOSITION_EXTRAIT_PLURILINGUE_NAISSANCE = "/composition/ACTE_NAISSANCE/4";
const URL_COMPOSITION_EXTRAIT_PLURILINGUE_MARIAGE = "/composition/ACTE_MARIAGE/4";
const URL_COMPOSITION_EXTRAIT_PLURILINGUE_DECES = "/composition/ACTE_DECES/4";

const URL_COMPOSITION_PROJET_ACTE = "/composition/PROJET_ACTE/1";

const getCompositionReponseSansDelivranceCS = (
  document: string,
  reponseSansDelivranceCS: IContenuReponseSansDelivranceCS
): Promise<any> => {
  return getComposition(`/composition/${document}/1`, reponseSansDelivranceCS);
};

const getCompositionCertificatSituation = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_CERTIFICAT_SITUATION, obj);
};

const getCompositionCertificatPacsRcRca = (obj: any, typeCertificat: ETypeRcRcaPacs): Promise<any> => {
  let fonctionAAppeler: any;
  switch (typeCertificat) {
    case ETypeRcRcaPacs.PACS:
      fonctionAAppeler = getCompositionCertificatPACS;
      break;

    case ETypeRcRcaPacs.RC:
      fonctionAAppeler = getCompositionCertificatRC;
      break;

    case ETypeRcRcaPacs.RCA:
      fonctionAAppeler = getCompositionCertificatRCA;
      break;

    default:
      break;
  }

  return fonctionAAppeler(obj);
};

const getCompositionExtraitPlurilingue = (obj: IExtraitCopieComposition): Promise<any> => {
  let fonctionAAppeler: any;

  switch (NatureActe.getEnumFor(obj.nature_acte)) {
    case NatureActe.NAISSANCE:
      fonctionAAppeler = getCompositionExtraitPlurilingueNaissance;
      break;

    case NatureActe.MARIAGE:
      fonctionAAppeler = getCompositionExtraitPlurilingueMariage;
      break;

    case NatureActe.DECES:
      fonctionAAppeler = getCompositionExtraitPlurilingueDeces;
      break;

    default:
      break;
  }

  return fonctionAAppeler(obj);
};

const getCompositionCertificatRCA = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_CERTIFICAT_RCA, obj);
};

const getCompositionCertificatRC = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_CERTIFICAT_RC, obj);
};

const getCompositionCertificatPACS = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_ATTESTATION_PACS, obj);
};

const getCompositionCourrier = (codeCourrier: string, obj: any): Promise<any> => {
  return getComposition(`/composition/${codeCourrier}/1`, obj);
};

const getCompositionExtraitOuCopieActeTexte = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_EXTRAIT_COPIE_ACTE_TEXTE, obj);
};

const getCompositionCopieActeImage = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_COPIE_ACTE_IMAGE, obj);
};

const getCompositionActeTexte = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_ACTE_TEXTE, obj);
};

const getCompositionExtraitPlurilingueNaissance = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_EXTRAIT_PLURILINGUE_NAISSANCE, obj);
};

const getCompositionExtraitPlurilingueMariage = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_EXTRAIT_PLURILINGUE_MARIAGE, obj);
};

const getCompositionExtraitPlurilingueDeces = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_EXTRAIT_PLURILINGUE_DECES, obj);
};

const getCompositionProjetActe = (obj: any): Promise<any> => {
  return getComposition(URL_COMPOSITION_PROJET_ACTE, obj);
};

const getComposition = (
  uri: string,
  data: any
): // Renvoie le document en base64
Promise<any> => {
  return api.fetch({
    method: HttpMethod.POST,
    uri,
    data
  });
};

export const compositionApi = {
  getCompositionCertificatSituation,
  getCompositionCertificatRCA,
  getCompositionReponseSansDelivranceCS,
  getCompositionCertificatRC,
  getCompositionCertificatPACS,
  getCompositionCertificatPacsRcRca,
  getCompositionCourrier,
  getCompositionExtraitOuCopieActeTexte,
  getCompositionCopieActeImage,
  getCompositionActeTexte,
  getCompositionExtraitPlurilingue,
  getCompositionProjetActe
};
