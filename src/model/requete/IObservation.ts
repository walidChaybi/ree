import DateUtils from "@util/DateUtils";
import { finirAvec3petitsPoints, premiereLettreEnMajuscule } from "@util/Utils";

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
    return observation ? premiereLettreEnMajuscule(finirAvec3petitsPoints(observation.texte, LONGUEUR_TEXTE_MAX)) : "";
  },
  getDate(observation?: IObservation): string {
    return observation ? DateUtils.getFormatDateFromTimestamp(observation.dateObservation) : "";
  }
};
