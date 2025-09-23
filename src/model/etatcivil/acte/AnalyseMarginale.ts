import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";
import { triListeObjetsSurPropriete } from "@util/Utils";
import DateRECE from "../../../utils/DateRECE";
import { ITitulaireAnalyseMarginaleDto, TitulaireAnalyseMarginale } from "./TitulaireAnalyseMarginale";

export interface IAnalyseMarginaleDto {
  id: string;
  titulaires: ITitulaireAnalyseMarginaleDto[];
  estValide: boolean;
  dateDebut: number;
  dateFin?: number;
}

export class AnalyseMarginale {
  private static readonly champsObligatoires: (keyof IAnalyseMarginaleDto)[] = ["id", "titulaires", "estValide", "dateDebut"];

  private constructor(
    public readonly id: string,
    public readonly titulaires: TitulaireAnalyseMarginale[],
    public readonly estValide: boolean,
    public readonly dateDebut: DateRECE,
    public readonly dateFin: DateRECE | null
  ) {}

  public static readonly depuisDto = (analyseMarginale: IAnalyseMarginaleDto): AnalyseMarginale | null => {
    if (champsObligatoiresDuDtoAbsents("IAnalyseMarginaleDto", analyseMarginale, this.champsObligatoires)) return null;

    return new AnalyseMarginale(
      analyseMarginale.id,
      triListeObjetsSurPropriete(
        analyseMarginale.titulaires
          .map(TitulaireAnalyseMarginale.depuisDto)
          .filter((titulaire): titulaire is TitulaireAnalyseMarginale => titulaire !== null),
        "ordre"
      ),
      analyseMarginale.estValide,
      DateRECE.depuisTimestamp(analyseMarginale.dateDebut),
      analyseMarginale.dateFin ? DateRECE.depuisTimestamp(analyseMarginale.dateFin) : null
    );
  };
}
