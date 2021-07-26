import { TypePieceJustificative } from "./enum/TypePieceJustificative";

export interface IPieceJustificativeV2 {
  id: string;
  nom: string;
  mimeType: string | MimeType;
  extension?: string;
  taille: number;
  identifiantSwift?: string;
  conteneurSwift?: string;
  contenu: string;
  typePieceJustificative: TypePieceJustificative;
}
