import { CategorieDocument } from "./CategorieDocument";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IDocumentPJ {
  id: string;
  categorie: CategorieDocument;
  piecesJustificatives: IPieceJustificativeCreation[];
}
