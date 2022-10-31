import { DEUX } from "@util/Utils";
import { MimeType } from "file-type/core";
import { Orientation } from "../composition/enum/Orientation";
import { IMention } from "../etatcivil/acte/mention/IMention";
import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { COURRIER, DocumentDelivrance } from "./enum/DocumentDelivrance";
import { MentionsRetirees } from "./enum/MentionsRetirees";
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
  ctv?: string;
  nbExemplaireImpression?: number;
  referenceSwift?: string;
  conteneurSwift: string;
  documentASignerElec?: {
    dateSignatureElectronique?: number;
  };
  validation?: Validation;
  mentionsRetirees?: MentionsRetirees[];
  ordre?: number;
}

export const DocumentReponse = {
  getDocumentsDeDelivrance(
    documentsReponse: IDocumentReponse[]
  ): IDocumentReponse[] {
    return documentsReponse.filter(d =>
      DocumentDelivrance.estDocumentDelivrance(d.typeDocument)
    );
  },

  getCopieIntegrale(
    documentsReponse?: IDocumentReponse[]
  ): IDocumentReponse | undefined {
    return documentsReponse?.find(d =>
      DocumentDelivrance.estCopieIntegrale(d.typeDocument)
    );
  },

  getExtraitPlurilingue(
    documentsReponse?: IDocumentReponse[]
  ): IDocumentReponse | undefined {
    return documentsReponse?.find(d =>
      DocumentDelivrance.estExtraitPlurilingue(d.typeDocument)
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
    const documentDelivrance = DocumentDelivrance.getEnumForUUID(
      document.typeDocument
    );
    if (DocumentDelivrance.estCourrierDAccompagnement(documentDelivrance)) {
      libelle = COURRIER;
    } else {
      libelle = documentDelivrance.libelle;
    }

    return libelle;
  },

  verifierDocumentsValides(documents?: IDocumentReponse[]): boolean {
    if (documents) {
      return documents.every(
        (el: IDocumentReponse) =>
          el.validation === undefined || el.validation === Validation.O
      );
    } else return false;
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
  },

  attribuerOrdreDocuments(
    documents: IDocumentReponse[],
    choixDelivrance: ChoixDelivrance
  ) {
    documents.forEach(doc => {
      const docDelivrance = DocumentDelivrance.getEnumForUUID(doc.typeDocument);
      if (DocumentDelivrance.estCourrierDAccompagnement(docDelivrance)) {
        doc.ordre = 0;
      } else if (
        docDelivrance ===
        DocumentDelivrance.getEnumForCode(
          ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(
            choixDelivrance
          )
        )
      ) {
        doc.ordre = 1;
      } else {
        doc.ordre = DEUX;
      }
    });
    return documents;
  },

  estMentionRetiree(document: IDocumentReponse, mention: IMention): boolean {
    return (
      document.mentionsRetirees != null &&
      document.mentionsRetirees.find(
        mentionRetiree => mentionRetiree.idMention === mention.id
      ) != null
    );
  },

  nEstPasMentionRetiree(
    document: IDocumentReponse,
    mention: IMention
  ): boolean {
    return !this.estMentionRetiree(document, mention);
  },

  getIdsMentionsRetiree(document: IDocumentReponse): string[] {
    return document.mentionsRetirees
      ? document.mentionsRetirees.map(
          mentionRetiree => mentionRetiree.idMention
        )
      : [];
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

export function documentDejaCreer(
  documents: IDocumentReponse[],
  choixDelivrance?: ChoixDelivrance
) {
  return documents.some(
    el =>
      DocumentDelivrance.getEnumForCode(
        ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(
          choixDelivrance
        )
      ) === DocumentDelivrance.getEnumForUUID(el.typeDocument)
  );
}

