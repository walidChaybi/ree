import { IActionDatee } from "../commun/IActionDatee";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";

export interface IModification extends IActionDatee {}

export const Modification = {
  getDate(modification: IModification) {
    return getFormatDateFromTimestamp(modification.date);
  },
  getDateEffet(modification: IModification) {
    return getFormatDateFromTimestamp(modification.dateEffet);
  }
};
