import {
  ADRESSE,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  PIECES_JOINTES,
  REQUERANT,
  REQUETE,
  TITULAIRE1,
  TITULAIRE2
} from "@composant/formulaire/ConstantesNomsForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { PieceJointe } from "@util/FileUtils";
import {
  Adresse,
  Evenement,
  Identite,
  LienTitulaire,
  Mandant,
  Requerant,
  Requete
} from "./ISaisirRequetePageForm";

export interface CreationRequeteRDC {
  saisie: SaisieRequeteRDC;
  refus?: boolean;
  futurStatut: StatutRequete;
}
export interface UpdateRequeteRDC {
  idRequete: string;
  saisie: SaisieRequeteRDC;
  refus?: boolean;
  futurStatut: StatutRequete;
}

export interface SaisieRequeteRDC {
  [REQUETE]: Requete;
  [EVENEMENT]: Evenement;
  [TITULAIRE1]: Identite;
  [TITULAIRE2]: Identite;
  [REQUERANT]: Requerant;
  [MANDANT]: Mandant;
  [LIEN_TITULAIRE]: LienTitulaire;
  [ADRESSE]: Adresse;
  [PIECES_JOINTES]?: PieceJointe[];
}
