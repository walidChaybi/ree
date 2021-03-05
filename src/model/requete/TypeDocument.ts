import { IDocumentDelivre } from "../../views/common/types/RequeteType";

export enum TypeDocument {
  AtestationPACS = "ATTESTATION_PACS",
  CertificatSituationRC = "CERTIFICAT_SITUATION_RC",
  CertificatSituationRCA = "CERTIFICAT_SITUATION_RCA",
  CertificatSituationRCetRCA = "CERTIFICAT_SITUATION_RC_RCA",
  CertificatSituationPACS = "CERTIFICAT_SITUATION_PACS",
  CopieIntegrale = "COPIE_INTEGRALE",
  CopieNonSignee = "COPIE_NON_SIGNEE",
  ExtraitAvecFiliation = "EXTRAIT_AVEC_FILIATION",
  ExtraitSansFiliation = "EXTRAIT_SANS_FILIATION",
  ExtraitPlurilingue = "EXTRAIT_PLURILINGUE",
  FA116 = "FA116",
  FA50 = "FA50",
  FA118 = "FA118",
  FA115 = "FA115",
  FA64 = "FA64",
  FA117 = "FA117",
  FA16 = "FA16",
  FA17 = "FA17",
  FA18 = "FA18",
  FA19 = "FA19",
  FA24 = "FA24",
  FA194 = "FA194",
  FALF = "FALF",
  FA55 = "FA55",
  FA55A = "FA55A",
  FA55B = "FA55B",
  FA55D = "FA55D",
  FA56 = "FA56",
  FA57 = "FA57",
  FA58 = "FA58",
  FA60 = "FA60",
  FA61 = "FA61",
  FA62 = "FA62"
}

export function getcopieIntegraleDocuments(
  documents: IDocumentDelivre[]
): IDocumentDelivre[] {
  return getDocumentsByTypeDocument(documents, TypeDocument.CopieIntegrale);
}

export function getExtraitDocuments(
  documents: IDocumentDelivre[]
): IDocumentDelivre[] {
  return [
    ...getDocumentsByTypeDocument(documents, TypeDocument.ExtraitAvecFiliation),
    ...getDocumentsByTypeDocument(documents, TypeDocument.ExtraitSansFiliation),
    ...getDocumentsByTypeDocument(documents, TypeDocument.ExtraitPlurilingue)
  ];
}

export function getCertificatDocuments(
  documents: IDocumentDelivre[]
): IDocumentDelivre[] {
  return [
    ...getDocumentsByTypeDocument(
      documents,
      TypeDocument.CertificatSituationRC
    ),
    ...getDocumentsByTypeDocument(
      documents,
      TypeDocument.CertificatSituationRCA
    ),
    ...getDocumentsByTypeDocument(
      documents,
      TypeDocument.CertificatSituationRCetRCA
    ),
    ...getDocumentsByTypeDocument(
      documents,
      TypeDocument.CertificatSituationPACS
    )
  ];
}

export function getAttestationDocuments(
  documents: IDocumentDelivre[]
): IDocumentDelivre[] {
  return getDocumentsByTypeDocument(documents, TypeDocument.AtestationPACS);
}

const posNumberFA = 2;
export function getCourriersAccompagnementDocuments(
  documents: IDocumentDelivre[]
) {
  let docsRes: IDocumentDelivre[] = [];
  for (const key in TypeDocument) {
    if (
      TypeDocument.hasOwnProperty(key) &&
      // Si la clé commence par FA et que le reste est un nombre
      key.startsWith("FA") &&
      !isNaN(Number(key.slice(posNumberFA)))
    ) {
      const clazz = TypeDocument as any;
      const typeDoc = clazz[key] as TypeDocument;
      docsRes = docsRes.concat(getDocumentsByTypeDocument(documents, typeDoc));
    }
  }
  return docsRes;
}

export function getAutresDocuments(
  documents: IDocumentDelivre[]
): IDocumentDelivre[] {
  return getDocumentsByTypeDocument(documents, TypeDocument.CopieNonSignee);
}

export const getDocumentsByTypeDocument = (
  documents: IDocumentDelivre[],
  type: TypeDocument
): IDocumentDelivre[] => {
  return documents.filter(element => element.typeDocument === type);
};
