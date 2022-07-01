import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IDocumentPJ {
  id: string;
  libelle: string;
  categorieDocument: string;
  piecesJustificatives: IPieceJustificativeCreation[];
}
