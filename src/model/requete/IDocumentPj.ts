import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";
import { PieceJustificativeCategorie } from "./PieceJustificativeCategorie";

export interface IDocumentPJ {
  id: string;
  categorie: PieceJustificativeCategorie;
  piecesJustificatives: IPieceJustificativeCreation[];
}
