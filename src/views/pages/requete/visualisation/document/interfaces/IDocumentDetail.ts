import { MimeType } from "../../../../../../ressources/MimeType";

export interface IDocumentDetail {
  nom: string;
  mimeType: MimeType.IMAGE_PNG | MimeType.APPLI_PDF;
  taille: number;
  identifiantDocument: string;
}
