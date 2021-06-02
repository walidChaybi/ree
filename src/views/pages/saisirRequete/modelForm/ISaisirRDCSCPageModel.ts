import { PieceJointe } from "../../../common/util/FileUtils";
import { Adresse, Identite, Requerent } from "./ISaisirRequetePageModel";

// Nom des sous-formulaires
export const DOCUMENT = "document";
export const INTERESSE = "interesse";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";
export const PIECES_JOINTES = "piecesJointes";

export interface SaisieRequeteRDCSC {
  [DOCUMENT]: string;
  [INTERESSE]: Identite;
  [REQUERANT]: Requerent;
  [ADRESSE]: Adresse;
  [PIECES_JOINTES]?: PieceJointe[];
}
