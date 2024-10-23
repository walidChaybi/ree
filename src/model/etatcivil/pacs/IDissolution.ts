import DateUtils from "@util/DateUtils";
import { IActionDatee } from "../commun/IActionDatee";
import { IAutorite } from "../commun/IAutorite";

export interface IDissolution extends IActionDatee {
  autorite: IAutorite;
  motif: string;
}

export const Dissolution = {
  getDate(dissolution: IDissolution) {
    return DateUtils.getFormatDateFromTimestamp(dissolution.date);
  },
  getDateEffet(dissolution: IDissolution) {
    return DateUtils.getFormatDateFromTimestamp(dissolution.dateEffet);
  },
  getMotif(dissolution: IDissolution) {
    return dissolution.motif;
  }
};
