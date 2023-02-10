import { getValeurOuVide } from "@util/Utils";
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

export function mapPieceJustificative(pj: any) {
  const piece = mapDocumentSwift(pj);
  piece.typePieceJustificative = pj.type?.value;
  return piece as IPieceJustificative;
}

export function mapDocumentSwift(document: any): any {
  return {
    nom: document.base64File.fileName,
    contenu: document.base64File.base64String,
    mimeType: document.base64File.mimeType,
    taille: document.base64File.taille,
    extension: document.base64File.extension,
    referenceSwift: getValeurOuVide(document.base64File.identifiantSwift),
    conteneurSwift: getValeurOuVide(document.base64File.conteneurSwift)
  };
}
