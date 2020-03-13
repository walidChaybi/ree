import { GroupementDocument } from "../../../../../../model/requete/GroupementDocument";

export interface IDocumentDetail {
  nom: string;
  mimeType: "image/png" | "application/pdf";
  taille: number;
  identifiantDocument: string;
  groupement: GroupementDocument;
}
