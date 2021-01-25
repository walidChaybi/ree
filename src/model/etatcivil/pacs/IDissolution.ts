import { IActionDatee } from "../commun/IActionDatee";
import {
  MotifDissolution,
  MotifDissolutionUtil
} from "../enum/MotifDissolution";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { IAutorite } from "../commun/IAutorite";

export interface IDissolution extends IActionDatee {
  autorite: IAutorite;
  motif: MotifDissolution;
}

export const Dissolution = {
  getDate(dissolution: IDissolution) {
    return getFormatDateFromTimestamp(dissolution.date);
  },
  getDateEffet(dissolution: IDissolution) {
    return getFormatDateFromTimestamp(dissolution.dateEffet);
  },
  getMotif(dissolution: IDissolution) {
    return MotifDissolutionUtil.getLibelle(dissolution.motif);
  }
};
