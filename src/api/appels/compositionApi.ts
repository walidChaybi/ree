import { IExtraitCopieComposition } from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { IContenuReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypePacsRcRca } from "@model/etatcivil/enum/TypePacsRcRca";
import { ApiManager, HttpMethod } from "../ApiManager";

export interface ICompositionDto {
  contenu: string;
  nbPages: number;
}

const api = ApiManager.getInstance("rece-composition-api", "v1");

const URL_COMPOSITION_CERTIFICAT_SITUATION =
  "/composition/CERTIFICAT_SITUATION/1";
const URL_COMPOSITION_CERTIFICAT_RCA =
  "/composition/CERTIFICAT_INSCRIPTION_RCA/1";
const URL_COMPOSITION_CERTIFICAT_RC =
  "/composition/CERTIFICAT_INSCRIPTION_RC/1";

const URL_COMPOSITION_ATTESTATION_PACS = "/composition/ATTESTATION_PACS/1";
const URL_COMPOSITION_EXTRAIT_COPIE_ACTE_TEXTE =
  "/composition/EXTAIT_COPIE_ACTE_TEXTE/1";

const URL_COMPOSITION_COPIE_ACTE_IMAGE = "/composition/ACTE_IMAGE/1";
const URL_COMPOSITION_ACTE_TEXTE = "/composition/ACTE_TEXTE/1";

const URL_COMPOSITION_EXTRAIT_PLURILINGUE_NAISSANCE =
  "/composition/ACTE_NAISSANCE/4";
const URL_COMPOSITION_EXTRAIT_PLURILINGUE_MARIAGE =
  "/composition/ACTE_MARIAGE/4";
const URL_COMPOSITION_EXTRAIT_PLURILINGUE_DECES = "/composition/ACTE_DECES/4";

const URL_COMPOSITION_PROJET_ACTE = "/composition/PROJET_ACTE/1";

function getCompositionReponseSansDelivranceCS(
  document: string,
  reponseSansDelivranceCS: IContenuReponseSansDelivranceCS
): Promise<any> {
  return getComposition(`/composition/${document}/1`, reponseSansDelivranceCS);
}

function getCompositionCertificatSituation(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_CERTIFICAT_SITUATION, obj);
}

function getCompositionCertificatPacsRcRca(
  obj: any,
  typeCertificat: TypePacsRcRca
): Promise<any> {
  let fonctionAAppeler: any;
  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      fonctionAAppeler = getCompositionCertificatPACS;
      break;

    case TypePacsRcRca.RC:
      fonctionAAppeler = getCompositionCertificatRC;
      break;

    case TypePacsRcRca.RCA:
      fonctionAAppeler = getCompositionCertificatRCA;
      break;

    default:
      break;
  }

  return fonctionAAppeler(obj);
}

function getCompositionExtraitPlurilingue(
  obj: IExtraitCopieComposition
): Promise<any> {
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
}

function getCompositionCertificatRCA(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_CERTIFICAT_RCA, obj);
}

function getCompositionCertificatRC(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_CERTIFICAT_RC, obj);
}

function getCompositionCertificatPACS(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_ATTESTATION_PACS, obj);
}

function getCompositionCourrier(codeCourrier: string, obj: any): Promise<any> {
  return getComposition(`/composition/${codeCourrier}/1`, obj);
}

function getCompositionExtraitOuCopieActeTexte(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_EXTRAIT_COPIE_ACTE_TEXTE, obj);
}

function getCompositionCopieActeImage(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_COPIE_ACTE_IMAGE, obj);
}

function getCompositionActeTexte(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_ACTE_TEXTE, obj);
}

function getCompositionExtraitPlurilingueNaissance(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_EXTRAIT_PLURILINGUE_NAISSANCE, obj);
}

function getCompositionExtraitPlurilingueMariage(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_EXTRAIT_PLURILINGUE_MARIAGE, obj);
}

function getCompositionExtraitPlurilingueDeces(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_EXTRAIT_PLURILINGUE_DECES, obj);
}

function getCompositionProjetActe(obj: any): Promise<any> {
  return getComposition(URL_COMPOSITION_PROJET_ACTE, obj);
}

function getComposition(
  uri: string,
  data: any
): // Renvoie le document en base64
Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri,
    data
  });
}

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
