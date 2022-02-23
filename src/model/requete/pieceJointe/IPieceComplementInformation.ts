import { MimeType } from "file-type";
import { ProvenancePiece } from "../enum/ProvenancePiece";

export interface IPieceComplementInformation {
  id: string;
  provenance?: ProvenancePiece;
  nom?: string;
  cheminSwift?: string;
  contenu?: string;
  mimeType: string | MimeType;
}
