import { TypePieceJointe } from "../../../views/common/hook/requete/piecesJointes/PostPiecesJointesHook";

// Objet générique (peut être une pièce justificative ou pièce complément information)
export interface IPieceJointe {
  id: string;
  libelle?: string;
  nom?: string;
  typePiece: TypePieceJointe;
}
