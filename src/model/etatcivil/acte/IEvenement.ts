import {
  getDateStringFromDateCompose,
  formatAHeure
} from "../../../views/common/util/DateUtils";
import { numberToString } from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../Lieux";

export interface IEvenement {
  heure?: number;
  minute?: number;
  jour?: number;
  mois?: number;
  annee: number;
  voie?: string;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays: string;
}

export const Evenement = {
  getDate(evenement?: IEvenement): string {
    return evenement
      ? `${getDateStringFromDateCompose({
          jour: numberToString(evenement.jour),
          mois: numberToString(evenement.mois),
          annee: numberToString(evenement.annee)
        })} ${formatAHeure(evenement.heure, evenement.minute)}`
      : "";
  },
  getLieu(evenement?: IEvenement): string {
    return evenement
      ? LieuxUtils.getLieu(
          evenement.ville,
          evenement.region,
          evenement.pays,
          evenement.arrondissement
        )
      : "";
  }
};
