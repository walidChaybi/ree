import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { PieceJointe } from "../../../utils/FileUtils";
import { ADRESSE, DOCUMENT, PIECES_JOINTES, REQUERANT, TITULAIRES } from "../../../views/common/composant/formulaire/ConstantesNomsForm";
import { ISaisieAdresse, ISaisieIdentite, ISaisieRequerant } from "./ISaisirRequetePageForm";

export interface IComplementCreationUpdateRequete {
  statutFinal?: StatutRequete;
}

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
  [REQUERANT]: ISaisieRequerant;
  [ADRESSE]: ISaisieAdresse;
  [PIECES_JOINTES]?: PieceJointe[];
}

type Titulaires = {
  titulaire1: ISaisieIdentite;
  titulaire2: ISaisieIdentite;
};
