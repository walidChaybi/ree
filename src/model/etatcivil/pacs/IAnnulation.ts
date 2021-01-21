import { IActionDatee } from "../commun/IActionDatee";
import { DecisionAnnulation } from "../enum/DecisionAnnulation";
import { IJuridiction } from "../commun/IJuridiction";

export interface IAnnulation extends IActionDatee {
  type: DecisionAnnulation;
  juridiction: IJuridiction;
  enrolementRG: string;
  enrolementPortalis: string;
}
