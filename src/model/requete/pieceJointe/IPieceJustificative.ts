import { ITypePieceJustificative, TypePieceJustificative } from "../enum/TypePieceJustificative";

export interface IPieceJustificative {
  id: string;
  nom: string;
  mimeType: string;
  extension?: string;
  taille: number;
  referenceSwift?: string;
  conteneurSwift?: string;
  contenu: string;
  typePieceJustificative: ITypePieceJustificative | null;
}

export const PieceJustificative = {
  getPieceJustificative(piecesJustificatives: IPieceJustificative[] | undefined, idPieceJustificative: string) {
    return piecesJustificatives?.find(pieceJustificative => pieceJustificative.id === idPieceJustificative);
  }
};

export function mapPieceJustificative(pj: any) {
  const piece = mapDocumentSwift(pj);
  piece.typePieceJustificative = TypePieceJustificative.depuisLibelle(pj.type?.libelle ?? "")?.id;
  return piece as IPieceJustificative;
}

export function mapDocumentSwift(document: any): any {
  return {
    nom: document.base64File.fileName,
    contenu: document.base64File.base64String,
    mimeType: document.base64File.mimeType,
    taille: document.base64File.taille,
    extension: document.base64File.extension,
    referenceSwift: document.base64File.identifiantSwift ?? "",
    conteneurSwift: document.base64File.conteneurSwift ?? ""
  };
}
