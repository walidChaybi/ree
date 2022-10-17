import { PieceJustificativeCategorie } from "./enum/PieceJustificativeCategorie";
import { PieceJustificativeLibelle } from "./enum/PieceJustificativeLibelle";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IDocumentPJ {
  id: string;
  categorie: PieceJustificativeCategorie;
  libelle: string;
  libelleTraite?: PieceJustificativeLibelle;
  piecesJustificatives: IPieceJustificativeCreation[];
}

export const DocumentPJ = {
  getPriorites(document: IDocumentPJ): number[] {
    return [
      PieceJustificativeLibelle.getPriorite(document.libelleTraite),
      PieceJustificativeLibelle.getNumero(
        document.libelle,
        document.libelleTraite
      ) ?? 0,
      PieceJustificativeCategorie.getPriorite(document.categorie)
    ];
  }
};
