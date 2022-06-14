import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { PieceJointe } from "../../../../common/util/FileUtils";
import { Adresse, Identite, Requerant } from "./ISaisirRequetePageModel";

// Nom des sous-formulaires
export const DOCUMENT = "document";
export const TITULAIRES = "titulaires";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";
export const PIECES_JOINTES = "piecesJointes";

export interface CreationRequeteRDCSC {
  id?: string;
  saisie: SaisieRequeteRDCSC;
  refus?: boolean;
  futurStatut: StatutRequete;
}

export interface UpdateRequeteRDCSC {
  idRequete: string;
  saisie: SaisieRequeteRDCSC;
  refus?: boolean;
  futurStatut: StatutRequete;
}
export interface SaisieRequeteRDCSC {
  [DOCUMENT]: string;
  [TITULAIRES]: Titulaires;
  [REQUERANT]: Requerant;
  [ADRESSE]: Adresse;
  [PIECES_JOINTES]?: PieceJointe[];
}

type Titulaires = {
  titulaire1: Identite;
  titulaire2: Identite;
};
