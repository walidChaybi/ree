import { ProvenancePiece } from "../enum/ProvenancePiece";
import { mapDocumentSwift } from "./IPieceJustificative";

export interface IPieceComplementInformation {
  id: string;
  provenance?: ProvenancePiece;
  nom?: string;
  cheminSwift?: string;
  contenu?: string;
  mimeType: string;
}

export function mapPieceComplementInformation(pci: any) {
  const piece = mapDocumentSwift(pci);
  piece.provenance = "OEC";
  return piece;
}
