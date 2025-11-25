import { EMimeType } from "../../ressources/EMimeType";
import { Orientation } from "../composition/enum/Orientation";
import { Mention } from "../etatcivil/acte/mention/Mention";
import { IOptionCourrierDocumentReponse } from "./IOptionCourrierDocumentReponse";
import { ITexteLibreCourrier } from "./ITexteLibreCourrier";
import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "./enum/DocumentDelivrance";
import { EValidation } from "./enum/EValidation";
import { MentionsRetirees } from "./enum/MentionsRetirees";

export interface IDocumentReponse {
  id: string;
  nom: string;
  typeDocument: string; // UUID nomenclature
  mimeType: EMimeType;
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
  validation?: EValidation;
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
      return documents.every((el: IDocumentReponse) => el.validation === undefined || el.validation === EValidation.O);
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

  estMentionRetiree(document: IDocumentReponse, mention: Mention): boolean {
    return document.mentionsRetirees?.find(mentionRetiree => mentionRetiree.idMention === mention.id) != null;
  }
};

const documentSansCtvExisteDejaAvecCtv = (documentSansCtv: IDocumentReponse, documentsAvecCtvs: IDocumentReponse[]): boolean => {
  return documentsAvecCtvs.find(documentAvecCtv => documentSansCtv.typeDocument === documentAvecCtv.typeDocument) !== undefined;
};

export const documentDejaCree = (documents: IDocumentReponse[], choixDelivrance?: ChoixDelivrance) => {
  return documents.some(
    el =>
      DocumentDelivrance.depuisCode(ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(choixDelivrance)) ===
      DocumentDelivrance.depuisId(el.typeDocument)
  );
};
