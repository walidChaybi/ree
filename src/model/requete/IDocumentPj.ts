import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IDocumentPJ {
  id: string;
  libelle: string;
  categorie: string;
  piecesJustificatives: IPieceJustificativeCreation[];
}
