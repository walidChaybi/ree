/* istanbul ignore file */
import DateUtils from "@util/DateUtils";
import { getValeurOuVide, numberToString } from "@util/Utils";
import { NatureActeRequete } from "./enum/NatureActeRequete";

export interface IEvenementRequete {
  id?: string;
  natureActe: NatureActeRequete;
  jour?: number;
  mois?: number;
  annee?: number;
  ville?: string;
  pays?: string;
}

export const EvenementRequete = {
  getDate(event?: IEvenementRequete): string {
    return event?.annee
      ? DateUtils.getDateStringFromDateCompose({
          jour: numberToString(event.jour),
          mois: numberToString(event.mois),
          annee: numberToString(event.annee)
        })
      : "";
  },
  getVille(event?: IEvenementRequete): string {
    return getValeurOuVide(event?.ville);
  },
  getPays(event?: IEvenementRequete): string {
    return getValeurOuVide(event?.pays);
  }
};
