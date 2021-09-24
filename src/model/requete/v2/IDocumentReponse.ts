import { MimeType } from "file-type/core";
import { Orientation } from "../../composition/enum/Orientation";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
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
}

export const DocumentReponse = {
  getDocumentsDeDelivrance(
    documentsReponse: IDocumentReponse[]
  ): IDocumentReponse[] {
    return documentsReponse.filter(d =>
      DocumentDelivrance.estDocumentDelivrance(d.typeDocument)
    );
  }
};

export const estExtraitCopie = (document: IDocumentReponse) => {
  return DocumentDelivrance.estExtraitCopie(document.nom);
};
