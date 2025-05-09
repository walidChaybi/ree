/* v8 ignore start */
import DateRECE from "../../../../../utils/DateRECE";
import { ITitulaireAnalyseMarginaleDto, TitulaireAnalyseMarginale } from "../../TitulaireAnalyseMarginale";

export interface IAnalyseMarginaleProjetActeTranscritDto {
  id: string;
  titulaires: ITitulaireAnalyseMarginaleDto[];
  estValide?: false;
  dateDebut: number;
  dateFin?: number;
}

export class AnalyseMarginaleProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IAnalyseMarginaleProjetActeTranscritDto)[] = [
    "id",
    "titulaires",
    "estValide",
    "dateDebut"
  ];

  private constructor(
    public readonly id: string,
    public readonly titulaires: TitulaireAnalyseMarginale[],
    public readonly estValide: false,
    public readonly dateDebut: DateRECE,
    public readonly dateFin?: DateRECE
  ) {}

  public static readonly depuisDto = (
    analyseMarginale: IAnalyseMarginaleProjetActeTranscritDto
  ): AnalyseMarginaleProjetActeTranscrit | null => {
    if (AnalyseMarginaleProjetActeTranscrit.champsObligatoires.some(cle => analyseMarginale[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un AnalyseMarginaleProjetActeTranscription n'est pas défini.`);
      return null;
    }

    return new AnalyseMarginaleProjetActeTranscrit(
      analyseMarginale.id,
      analyseMarginale.titulaires
        .map(TitulaireAnalyseMarginale.depuisDto)
        .filter((titulaire): titulaire is TitulaireAnalyseMarginale => titulaire !== null),
      analyseMarginale?.estValide ?? false,
      DateRECE.depuisTimestamp(analyseMarginale.dateDebut),
      typeof analyseMarginale.dateFin === "number" ? DateRECE.depuisTimestamp(analyseMarginale.dateFin) : analyseMarginale.dateFin
    );
  };

  public readonly versDto = (): IAnalyseMarginaleProjetActeTranscritDto => {
    return {
      id: this.id,
      dateDebut: this.dateDebut.versTimestamp(),
      titulaires: this.titulaires.map(titulaire => titulaire.versDto())
    };
  };
}
/* v8 ignore stop */
