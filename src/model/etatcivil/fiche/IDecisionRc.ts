import { TypeDecision } from "../enum/TypeDecision";
import { IAutorite } from "../commun/IAutorite";
import { ISourceConfirmation } from "./ISourceConfirmation";

export interface IDecisionRc {
  dateDecision: number;
  dateDecisionEtrangere: number;
  type: TypeDecision;
  autorite: IAutorite;
  enrolementRg: string;
  enrolementPortalis: string;
  sourceConfirmation: ISourceConfirmation;
}
