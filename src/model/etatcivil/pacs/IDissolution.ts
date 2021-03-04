import { IActionDatee } from "../commun/IActionDatee";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { IAutorite } from "../commun/IAutorite";

export interface IDissolution extends IActionDatee {
  autorite: IAutorite;
  motif: string;
}

export const Dissolution = {
  getDate(dissolution: IDissolution) {
    return getFormatDateFromTimestamp(dissolution.date);
  },
  getDateEffet(dissolution: IDissolution) {
    return getFormatDateFromTimestamp(dissolution.dateEffet);
  },
  getMotif(dissolution: IDissolution) {
    return dissolution.motif;
  }
};
