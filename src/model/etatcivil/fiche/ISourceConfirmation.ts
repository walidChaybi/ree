import { TypeDecision } from "../enum/TypeDecision";
import { IAutorite } from "../commun/IAutorite";

export interface ISourceConfirmation {
  autorite: IAutorite;
  dateDecision: number;
  dateDecisionEtrangere: number;
  type: TypeDecision;
  enrolementRg: string;
  enrolementPortalis: string;
}
