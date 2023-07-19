import { getValeurOuVide } from "@util/Utils";
import { TypePieceJustificative } from "../enum/TypePieceJustificative";

export interface IPieceJustificative {
  id: string;
  nom: string;
  mimeType: string;
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
  piece.typePieceJustificative = TypePieceJustificative.getKeyForLibelle(
    pj.type?.libelle
  );
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
