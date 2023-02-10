export enum TypePieceJointe {
  PIECE_COMPLEMENT_INFORMATION,
  PIECE_JUSTIFICATIVE
}
export interface IPieceJointe {
  id: string;
  libelle?: string;
  nom?: string;
  typePiece: TypePieceJointe;
}
