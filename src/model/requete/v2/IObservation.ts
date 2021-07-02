import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import {
  enMajuscule,
  finirAvec3petitsPoints,
  premiereLettreEnMajuscule
} from "../../../views/common/util/Utils";

const LONGUEUR_TEXTE_MAX = 30;

export interface IObservation {
  id: string;
  texte: string;
  idUtilisateur: string;
  numeroOrdre: number;
  dateObservation: number;
  trigramme: string;
}

export const Observation = {
  getTexte(observation?: IObservation): string {
    return observation
      ? premiereLettreEnMajuscule(
          finirAvec3petitsPoints(observation.texte, LONGUEUR_TEXTE_MAX)
        )
      : "";
  },
  getTrigramme(observation?: IObservation): string {
    return observation ? enMajuscule(observation.trigramme) : "";
  },
  getDate(observation?: IObservation): string {
    return observation
      ? getFormatDateFromTimestamp(observation.dateObservation)
      : "";
  }
};
