import { PieceJointe } from "../../../common/util/FileUtils";
import { Adresse, Identite, Requerant } from "./ISaisirRequetePageModel";

// Nom des sous-formulaires
export const DOCUMENT = "document";
export const INTERESSE = "interesse";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";
export const PIECES_JOINTES = "piecesJointes";

export interface CreationRequeteRDCSC {
  id?: string;
  saisie: SaisieRequeteRDCSC;
  refus?: boolean;
  brouillon?: boolean;
}

export interface UpdateRequeteRDCSC {
  idRequete: string;
  saisie: SaisieRequeteRDCSC;
  refus?: boolean;
  brouillon?: boolean;
}
export interface SaisieRequeteRDCSC {
  [DOCUMENT]: string;
  [INTERESSE]: Identite;
  [REQUERANT]: Requerant;
  [ADRESSE]: Adresse;
  [PIECES_JOINTES]?: PieceJointe[];
}
