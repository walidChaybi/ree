import { IActionDatee } from "../commun/IActionDatee";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { IAutorite } from "../commun/IAutorite";

export interface IModification extends IActionDatee {
  autorite: IAutorite;
}

export const Modification = {
  getDate(modification: IModification) {
    return getFormatDateFromTimestamp(modification.date);
  },
  getDateEffet(modification: IModification) {
    return getFormatDateFromTimestamp(modification.dateEffet);
  }
};
