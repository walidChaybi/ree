/* istanbul ignore file */
import { getDateStringFromDateCompose } from "../../../views/common/util/DateUtils";
import {
  numberToString,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../views/common/util/Utils";
import { TypeNatureActe } from "./enum/TypeNatureActe";

export interface IEvenementReqDelivrance {
  id: string;
  natureActe: TypeNatureActe;
  jour?: number;
  mois?: number;
  annee?: number;
  ville?: string;
  pays?: string;
}

export const EvenementReqDelivrance = {
  getDate(event?: IEvenementReqDelivrance): string {
    return event && event.annee
      ? getDateStringFromDateCompose({
          jour: numberToString(event.jour),
          mois: numberToString(event.mois),
          annee: numberToString(event.annee)
        })
      : "";
  },
  getVille(event?: IEvenementReqDelivrance): string {
    return event && event.ville
      ? premiereLettreEnMajusculeLeResteEnMinuscule(event.ville)
      : "";
  },
  getPays(event?: IEvenementReqDelivrance): string {
    return event && event.pays
      ? premiereLettreEnMajusculeLeResteEnMinuscule(event.pays)
      : "";
  }
};
