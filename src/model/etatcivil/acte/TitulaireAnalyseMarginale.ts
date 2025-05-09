/* v8 ignore start */
import { ETypeDeclarationConjointe } from "../enum/TypeDeclarationConjointe";

export interface ITitulaireAnalyseMarginaleDto {
  nom: string;
  prenoms: string[];
  ordre: number;
  typeDeclarationConjointe?: keyof typeof ETypeDeclarationConjointe;
}

export class TitulaireAnalyseMarginale {
  private static readonly champsObligatoires: (keyof ITitulaireAnalyseMarginaleDto)[] = ["nom", "prenoms", "ordre"];

  private constructor(
    public readonly nom: string,
    public readonly prenoms: string[],
    public readonly ordre: number
  ) {}

  public static readonly depuisDto = (titulaireAnalyseMarginale: ITitulaireAnalyseMarginaleDto): TitulaireAnalyseMarginale | null => {
    if (TitulaireAnalyseMarginale.champsObligatoires.some(cle => titulaireAnalyseMarginale[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un titulaireProjetActeTranscrit n'est pas défini.`);
      return null;
    }

    return new TitulaireAnalyseMarginale(titulaireAnalyseMarginale.nom, titulaireAnalyseMarginale.prenoms, titulaireAnalyseMarginale.ordre);
  };

  public readonly versDto = (): ITitulaireAnalyseMarginaleDto => {
    return {
      nom: this.nom,
      prenoms: this.prenoms,
      ordre: this.ordre
    };
  };
}
/* v8 ignore stop */
