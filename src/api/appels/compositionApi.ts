import { IContenuReponseSansDelivranceCS } from "../../model/composition/IReponseSansDelivranceCS";
import { TypePacsRcRca } from "../../model/etatcivil/enum/TypePacsRcRca";
import { ApiManager, HttpMethod } from "../ApiManager";

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
  let foncionAAppeler: any;
  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      foncionAAppeler = getCompositionCertificatPACS;
      break;

    case TypePacsRcRca.RC:
      foncionAAppeler = getCompositionCertificatRC;
      break;

    case TypePacsRcRca.RCA:
      foncionAAppeler = getCompositionCertificatRCA;
      break;

    default:
      break;
  }

  return foncionAAppeler(obj);
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
  return getComposition("/TODO", obj);
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
  getCompositionCopieActeImage
};
