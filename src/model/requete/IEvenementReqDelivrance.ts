/* istanbul ignore file */
import { getDateStringFromDateCompose } from "@util/DateUtils";
import { getValeurOuVide, numberToString } from "@util/Utils";
import { NatureActeRequete } from "./enum/NatureActeRequete";

export interface IEvenementReqDelivrance {
  id?: string;
  natureActe: NatureActeRequete;
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
    return getValeurOuVide(event?.ville);
  },
  getPays(event?: IEvenementReqDelivrance): string {
    return getValeurOuVide(event?.pays);
  }
};
