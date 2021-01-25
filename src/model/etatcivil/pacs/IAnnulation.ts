import { IActionDatee } from "../commun/IActionDatee";
import {
  DecisionAnnulation,
  DecisionAnnulationUtil
} from "../enum/DecisionAnnulation";
import { TypeJuridictionUtil } from "../enum/TypeJuridiction";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { getValeurOuVide } from "../../../views/common/util/Utils";
import { IAutorite } from "../commun/IAutorite";

export interface IAnnulation extends IActionDatee {
  type: DecisionAnnulation;
  autorite: IAutorite;
  enrolementRG: string;
  enrolementPortalis: string;
}

export const Annulation = {
  getTypeDecision(annulation: IAnnulation): string {
    return DecisionAnnulationUtil.getLibelle(annulation.type);
  },
  getDate(annulation: IAnnulation): string {
    return getFormatDateFromTimestamp(annulation.date);
  },
  getJuridiction(annulation: IAnnulation): string {
    return annulation.autorite
      ? TypeJuridictionUtil.getLibelle(annulation.autorite.typeJuridiction)
      : "";
  },
  getEnrolementRG(annulation: IAnnulation): string {
    return getValeurOuVide(annulation.enrolementRG);
  },
  getEnrolementPortalis(annulation: IAnnulation): string {
    return getValeurOuVide(annulation.enrolementPortalis);
  }
};
