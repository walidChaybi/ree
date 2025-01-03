/* istanbul ignore file */
import DateUtils from "@util/DateUtils";
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
          jour: event.jour?.toString() ?? "",
          mois: event.mois?.toString() ?? "",
          annee: event.annee?.toString() ?? ""
        })
      : "";
  },
  getVille(event?: IEvenementRequete): string {
    return event?.ville ?? "";
  },
  getPays(event?: IEvenementRequete): string {
    return event?.pays ?? "";
  }
};
