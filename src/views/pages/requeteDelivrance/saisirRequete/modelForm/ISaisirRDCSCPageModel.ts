import {
  ADRESSE,
  DOCUMENT,
  PIECES_JOINTES,
  REQUERANT,
  TITULAIRES
} from "@composant/formulaire/ConstantesNomsForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  Adresse,
  Identite,
  Requerant
} from "@pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";
import { PieceJointe } from "@util/FileUtils";

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
