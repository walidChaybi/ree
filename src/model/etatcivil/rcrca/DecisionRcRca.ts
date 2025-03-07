import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import { IAutorite } from "../commun/IAutorite";
import { ETypeDecision } from "../enum/ETypeDecision";
import { IInstructionProcureur } from "./IInstructionProcureur";
import { ISourceConfirmationDTO, SourceConfirmation } from "./SourceConfirmation";

export interface IDecisionRcRca {
  dateDecision: number;
  type: ETypeDecision;
  autorite: IAutorite;
  enrolementRg: string;
  enrolementPortalis: string;
  sourceConfirmation: SourceConfirmation | null;
  dateDecisionEtrangere?: number;
  instructionProcureur?: IInstructionProcureur;
  // cas d'une décision Notaire de type Requête exécutée par une juridiction
  juridictionExecutante?: IAutorite;
}

export interface IDecisionRcRcaDTO {
  dateDecision: TDateArrayDTO;
  type: keyof typeof ETypeDecision;
  autorite: IAutorite;
  enrolementRg?: string;
  enrolementPortalis?: string;
  sourceConfirmation?: ISourceConfirmationDTO;
  dateDecisionEtrangere?: TDateArrayDTO;
  instructionProcureur?: IInstructionProcureur;
  // cas d'une décision Notaire de type Requête exécutée par une juridiction
  juridictionExecutante?: IAutorite;
}

export class DecisionRcRca {
  private static readonly champsObligatoires: (keyof IDecisionRcRcaDTO)[] = ["dateDecision", "type", "autorite"];

  private constructor(
    public readonly dateDecision: number,
    public readonly type: ETypeDecision,
    public readonly autorite: IAutorite,
    public readonly enrolementRg: string,
    public readonly enrolementPortalis: string,
    public readonly sourceConfirmation: SourceConfirmation | null,
    public readonly dateDecisionEtrangere?: number,
    public readonly instructionProcureur?: IInstructionProcureur,
    public readonly juridictionExecutante?: IAutorite
  ) {}

  public static readonly depuisDto = (decisionRcRca: IDecisionRcRcaDTO): DecisionRcRca | null => {
    switch (true) {
      case DecisionRcRca.champsObligatoires.some(cle => decisionRcRca[cle] === undefined):
        console.error(`Un champ obligatoire d'un DecisionRcRca n'est pas défini.`);
        return null;
      case !Object.keys(ETypeDecision).includes(decisionRcRca.type):
        console.error(
          `Le type d'un DecisionRcRca a la valeur ${decisionRcRca.type} au lieu d'une des suivantes : ${Object.keys(ETypeDecision)}.`
        );
        return null;
    }
    return new DecisionRcRca(
      DateUtils.getTimestampFromDateArrayDto(decisionRcRca.dateDecision),
      ETypeDecision[decisionRcRca.type],
      decisionRcRca.autorite,
      decisionRcRca.enrolementRg ?? "",
      decisionRcRca.enrolementPortalis ?? "",
      decisionRcRca.sourceConfirmation ? SourceConfirmation.depuisDto(decisionRcRca.sourceConfirmation) : null,
      decisionRcRca.dateDecisionEtrangere ? DateUtils.getTimestampFromDateArrayDto(decisionRcRca.dateDecisionEtrangere) : undefined,
      decisionRcRca.instructionProcureur,
      decisionRcRca.juridictionExecutante
    );
  };
}
