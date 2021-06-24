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
  getTexte(Observation?: IObservation): string {
    return Observation
      ? premiereLettreEnMajuscule(
          finirAvec3petitsPoints(Observation.texte, LONGUEUR_TEXTE_MAX)
        )
      : "";
  },
  getTrigramme(Observation?: IObservation): string {
    return Observation ? enMajuscule(Observation.trigramme) : "";
  },
  getDate(Observation?: IObservation): string {
    return Observation
      ? getFormatDateFromTimestamp(Observation.dateObservation)
      : "";
  }
};
