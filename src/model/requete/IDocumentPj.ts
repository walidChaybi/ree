import { CategorieDocument } from "./CategorieDocument";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IDocumentPJ {
  id: string;
  categorie: CategorieDocument;
  piecesJustificatives: IPieceJustificativeCreation[];
}

export const DocumentPJ = {
  trie(documentsPJs?: IDocumentPJ[]): IDocumentPJ[] {
    return (
      documentsPJs?.sort(
        (documentPJ1, documentPJ2) =>
          documentPJ1.categorie.ordre - documentPJ2.categorie.ordre
      ) || []
    );
  },
  getDocumentPJ(
    documentsPJs: IDocumentPJ[] | undefined,
    idDocumentPJ: string | undefined
  ): IDocumentPJ | undefined {
    return documentsPJs?.find(document => document.id === idDocumentPJ);
  },
  getPieceJustificative(
    documentsPJs: IDocumentPJ[] | undefined,
    idDocumentPJ: string | undefined,
    idPieceJustificative: string
  ): IPieceJustificativeCreation | undefined {
    return this.getDocumentPJ(
      documentsPJs,
      idDocumentPJ
    )?.piecesJustificatives.find(piece => piece.id === idPieceJustificative);
  }
};
