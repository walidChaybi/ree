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
  Evenement,
  ISaisieAdresse,
  ISaisieIdentite,
  ISaisieRequerant,
  LienTitulaire,
  Mandant,
  Requete
} from "./ISaisirRequetePageForm";

export interface IComplementCreationUpdateRequete {
  statutFinal?: StatutRequete;
}

export interface CreationRequeteRDC {
  saisie: SaisieRequeteRDC;
  refus?: boolean;
  futurStatut: StatutRequete;
}
export interface UpdateRequeteRDC extends CreationRequeteRDC {
  idRequete: string;
}

export interface SaisieRequeteRDC {
  [REQUETE]: Requete;
  [EVENEMENT]: Evenement;
  [TITULAIRE1]: ISaisieIdentite;
  [TITULAIRE2]: ISaisieIdentite;
  [REQUERANT]: ISaisieRequerant;
  [MANDANT]: Mandant;
  [LIEN_TITULAIRE]: LienTitulaire;
  [ADRESSE]: ISaisieAdresse;
  [PIECES_JOINTES]?: PieceJointe[];
}
