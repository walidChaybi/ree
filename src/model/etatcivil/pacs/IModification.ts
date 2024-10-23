import DateUtils from "@util/DateUtils";
import { IActionDatee } from "../commun/IActionDatee";
import { IAutorite } from "../commun/IAutorite";

export interface IModification extends IActionDatee {
  autorite: IAutorite;
}

export const Modification = {
  getDate(modification: IModification) {
    return DateUtils.getFormatDateFromTimestamp(modification.date);
  },
  getDateEffet(modification: IModification) {
    return DateUtils.getFormatDateFromTimestamp(modification.dateEffet);
  }
};
