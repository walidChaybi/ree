import { MimeType } from "file-type/core";
import { Orientation } from "../composition/enum/Orientation";
import { COURRIER, DocumentDelivrance } from "./enum/DocumentDelivrance";
import { Validation } from "./enum/Validation";
import { IOptionCourrierDocumentReponse } from "./IOptionCourrierDocumentReponse";
import { ITexteLibreCourrier } from "./ITexteLibreCourrier";

export interface IDocumentReponse {
  id: string;
  nom: string;
  typeDocument: string; // UUID nomenclature
  mimeType: MimeType;
  taille: number;
  contenu: string; // Base64
  nbPages: number;
  orientation: Orientation;
  texteLibreCourrier?: ITexteLibreCourrier;
  optionsCourrier?: IOptionCourrierDocumentReponse[];
  idActe?: string;
  idRc?: string;
  idRca?: string;
  idPacs?: string;
  avecCtv?: boolean;
  nbExemplaireImpression?: number;
  conteneurSwift: string;
  documentASignerElec?: {
    dateSignatureElectronique?: number;
  };
  validation?: Validation;
  uuidActe?: string;
}

export const DocumentReponse = {
  getDocumentsDeDelivrance(
    documentsReponse: IDocumentReponse[]
  ): IDocumentReponse[] {
    return documentsReponse.filter(d =>
      DocumentDelivrance.estDocumentDelivrance(d.typeDocument)
    );
  },

  estExtraitCopie(document: IDocumentReponse) {
    return DocumentDelivrance.estExtraitCopie(document.nom);
  },

  triDocumentsDelivrance(documents: IDocumentReponse[]): IDocumentReponse[] {
    const documentsSansDoublonSansCtv = this.enleverDoublonSansCtv(documents);
    return documentsSansDoublonSansCtv.sort(
      (doc1, doc2) =>
        DocumentDelivrance.getNumeroOrdre(doc1.typeDocument) -
        DocumentDelivrance.getNumeroOrdre(doc2.typeDocument)
    );
  },

  getLibelle(document: IDocumentReponse) {
    let libelle: string;
    const documentDelivrance = DocumentDelivrance.getEnumFor(
      document.typeDocument
    );
    if (DocumentDelivrance.estCourrierDAccompagnement(documentDelivrance)) {
      libelle = COURRIER;
    } else {
      libelle = documentDelivrance.libelle;
    }

    return libelle;
  },

  // Elimine les documents sans CTV qui existent déjà avec un CTV dans les documents réponse
  enleverDoublonSansCtv(documents: IDocumentReponse[]): IDocumentReponse[] {
    let resulatDocumentsSansDoublons: IDocumentReponse[];

    const documentsSansCtvs: IDocumentReponse[] = [];
    const documentsAvecCtvs: IDocumentReponse[] = [];

    documents.forEach(document => {
      if (!document.avecCtv) {
        documentsSansCtvs.push(document);
      } else {
        documentsAvecCtvs.push(document);
      }
    });

    resulatDocumentsSansDoublons = [...documentsAvecCtvs];

    documentsSansCtvs.forEach(documentSansCtv => {
      if (
        !documentSansCtvExisteDejaAvecCtv(documentSansCtv, documentsAvecCtvs)
      ) {
        resulatDocumentsSansDoublons.push(documentSansCtv);
      }
    });

    return resulatDocumentsSansDoublons;
  }
};

function documentSansCtvExisteDejaAvecCtv(
  documentSansCtv: IDocumentReponse,
  documentsAvecCtvs: IDocumentReponse[]
): boolean {
  return (
    documentsAvecCtvs.find(
      documentAvecCtv =>
        documentSansCtv.typeDocument === documentAvecCtv.typeDocument
    ) !== undefined
  );
}
