import { DEUX } from "@util/Utils";
import { Orientation } from "../composition/enum/Orientation";
import { IMention } from "../etatcivil/acte/mention/IMention";
import { IOptionCourrierDocumentReponse } from "./IOptionCourrierDocumentReponse";
import { ITexteLibreCourrier } from "./ITexteLibreCourrier";
import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "./enum/DocumentDelivrance";
import { MentionsRetirees } from "./enum/MentionsRetirees";
import { Validation } from "./enum/Validation";

export interface IDocumentReponse {
  id: string;
  nom: string;
  typeDocument: string; // UUID nomenclature
  mimeType: string;
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
  getDocumentsDeDelivrance(documentsReponse: IDocumentReponse[]): IDocumentReponse[] {
    return documentsReponse.filter(d => DocumentDelivrance.estDocumentDelivrance(d.typeDocument));
  },

  getCopieIntegrale(documentsReponse?: IDocumentReponse[]): IDocumentReponse | undefined {
    return documentsReponse?.find(d => DocumentDelivrance.estCopieIntegrale(d.typeDocument));
  },

  getExtraitPlurilingue(documentsReponse?: IDocumentReponse[]): IDocumentReponse | undefined {
    return documentsReponse?.find(d => DocumentDelivrance.estExtraitPlurilingue(d.typeDocument));
  },

  estExtraitCopie(document: IDocumentReponse) {
    return DocumentDelivrance.estExtraitCopieViaUUID(document.typeDocument);
  },

  triDocumentsDelivrance(documents: IDocumentReponse[]): IDocumentReponse[] {
    const documentsSansDoublonSansCtv = this.enleverDoublonSansCtv(documents);
    return documentsSansDoublonSansCtv.sort(
      (doc1, doc2) => DocumentDelivrance.getNumeroOrdre(doc1.typeDocument) - DocumentDelivrance.getNumeroOrdre(doc2.typeDocument)
    );
  },

  getLibelle(document: IDocumentReponse) {
    const documentDelivrance = DocumentDelivrance.depuisId(document.typeDocument);

    return DocumentDelivrance.estCourrierDAccompagnement(documentDelivrance)
      ? ECodeDocumentDelivrance.COURRIER
      : (documentDelivrance?.libelle ?? "");
  },

  verifierDocumentsValides(documents?: IDocumentReponse[]): boolean {
    if (documents) {
      return documents.every((el: IDocumentReponse) => el.validation === undefined || el.validation === Validation.O);
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
      if (!documentSansCtvExisteDejaAvecCtv(documentSansCtv, documentsAvecCtvs)) {
        resulatDocumentsSansDoublons.push(documentSansCtv);
      }
    });

    return resulatDocumentsSansDoublons;
  },

  attribuerOrdreDocuments(documents: IDocumentReponse[], choixDelivrance: ChoixDelivrance) {
    documents.forEach(doc => {
      const docDelivrance = DocumentDelivrance.depuisId(doc.typeDocument);
      if (DocumentDelivrance.estCourrierDAccompagnement(docDelivrance)) {
        doc.ordre = 0;
      } else if (
        docDelivrance === DocumentDelivrance.depuisCode(ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(choixDelivrance))
      ) {
        doc.ordre = 1;
      } else {
        doc.ordre = DEUX;
      }
    });
    return documents;
  },

  estMentionRetiree(document: IDocumentReponse, mention: IMention): boolean {
    return document.mentionsRetirees?.find(mentionRetiree => mentionRetiree.idMention === mention.id) != null;
  },

  getIdsMentionsRetiree(document: IDocumentReponse): string[] {
    return document.mentionsRetirees ? document.mentionsRetirees.map(mentionRetiree => mentionRetiree.idMention) : [];
  }
};

function documentSansCtvExisteDejaAvecCtv(documentSansCtv: IDocumentReponse, documentsAvecCtvs: IDocumentReponse[]): boolean {
  return documentsAvecCtvs.find(documentAvecCtv => documentSansCtv.typeDocument === documentAvecCtv.typeDocument) !== undefined;
}

export function documentDejaCree(documents: IDocumentReponse[], choixDelivrance?: ChoixDelivrance) {
  return documents.some(
    el =>
      DocumentDelivrance.depuisCode(ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(choixDelivrance)) ===
      DocumentDelivrance.depuisId(el.typeDocument)
  );
}
