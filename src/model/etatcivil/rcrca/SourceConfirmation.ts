import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import { IAutorite } from "../commun/IAutorite";
import { ETypeDecision } from "../enum/ETypeDecision";

export interface ISourceConfirmationDTO {
  autorite: IAutorite;
  dateDecision: TDateArrayDTO;
  type: keyof typeof ETypeDecision;
  enrolementRg: string;
  enrolementPortalis: string;
  dateDecisionEtrangere?: TDateArrayDTO;
}

export class SourceConfirmation {
  private static readonly champsObligatoires: (keyof ISourceConfirmationDTO)[] = [
    "autorite",
    "dateDecision",
    "type",
    "enrolementRg",
    "enrolementPortalis"
  ];

  private constructor(
    public readonly autorite: IAutorite,
    public readonly dateDecision: number,
    public readonly type: ETypeDecision,
    public readonly enrolementRg: string,
    public readonly enrolementPortalis: string,
    public readonly dateDecisionEtrangere: number | null
  ) {}

  public static readonly depuisDto = (sourceConfirmation: ISourceConfirmationDTO): SourceConfirmation | null => {
    switch (true) {
      case SourceConfirmation.champsObligatoires.some(cle => sourceConfirmation[cle] === undefined):
        console.error(`Un champ obligatoire d'un ${typeof sourceConfirmation} n'est pas défini.`);
        return null;
      case !Object.keys(ETypeDecision).includes(sourceConfirmation.type):
        console.error(
          `Le type de ${typeof sourceConfirmation} a la valeur ${sourceConfirmation.type} au lieu d'une des suivantes : ${Object.keys(ETypeDecision)}.`
        );
        return null;
    }

    return new SourceConfirmation(
      sourceConfirmation.autorite,
      DateUtils.getTimestampFromDateArrayDto(sourceConfirmation.dateDecision),
      ETypeDecision[sourceConfirmation.type],
      sourceConfirmation.enrolementRg,
      sourceConfirmation.enrolementPortalis,
      sourceConfirmation.dateDecisionEtrangere ? DateUtils.getTimestampFromDateArrayDto(sourceConfirmation.dateDecisionEtrangere) : null
    );
  };
}
