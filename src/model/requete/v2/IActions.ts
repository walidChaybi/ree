/* istanbul ignore file */
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import {
  enMajuscule,
  premiereLettreEnMajuscule
} from "../../../views/common/util/Utils";

export interface IAction {
  id: string;
  numeroOrdre: number;
  libelle: string;
  dateAction: number;
  idUtilisateur: string;
  trigramme: string;
}

export const Action = {
  getLibelle(action?: IAction): string {
    return action ? premiereLettreEnMajuscule(action.libelle) : "";
  },
  getTrigramme(action?: IAction): string {
    return action ? enMajuscule(action.trigramme) : "";
  },
  getDateAction(action?: IAction): string {
    return action ? getFormatDateFromTimestamp(action.dateAction) : "";
  }
};
