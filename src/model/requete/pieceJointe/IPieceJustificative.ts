import { MimeType } from "file-type";
import { TypePieceJustificative } from "../enum/TypePieceJustificative";

export interface IPieceJustificative {
  id: string;
  nom: string;
  mimeType: string | MimeType;
  extension?: string;
  taille: number;
  referenceSwift?: string;
  conteneurSwift?: string;
  contenu: string;
  typePieceJustificative: TypePieceJustificative;
}

export const PieceJustificative = {
  getPieceJustificative(
    piecesJustificatives: IPieceJustificative[] | undefined,
    idPieceJustificative: string
  ) {
    return piecesJustificatives?.find(
      pieceJustificative => pieceJustificative.id === idPieceJustificative
    );
  }
};

