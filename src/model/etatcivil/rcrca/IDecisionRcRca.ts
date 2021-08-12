import { IAutorite } from "../commun/IAutorite";
import { TypeDecision } from "../enum/TypeDecision";
import { IInstructionProcureur } from "./IInstructionProcureur";
import { ISourceConfirmation } from "./ISourceConfirmation";

export interface IDecisionRcRca {
  dateDecision: number;
  type: TypeDecision;
  enrolementRg: string;
  enrolementPortalis: string;
  dateDecisionEtrangere: number;
  autorite: IAutorite;
  sourceConfirmation: ISourceConfirmation;
  instructionProcureur: IInstructionProcureur;
}
