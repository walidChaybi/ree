import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { TDateArrayDTO } from "@util/DateUtils";
import DateRECE from "../../../utils/DateRECE";
import ETypeDeclarationConjointe from "../enum/ETypeDeclarationConjointe";
import { TitulaireActe } from "./TitulaireActe";

export interface ITitulaireAnalyseMarginaleDto {
  nom?: string;
  prenoms: string[];
  ordre: number;
  typeDeclarationConjointe?: keyof typeof ETypeDeclarationConjointe;
  dateDeclarationConjointe?: TDateArrayDTO;
  nomPartie1?: string;
  nomPartie2?: string;
}

export class TitulaireAnalyseMarginale {
  private static readonly champsObligatoires: (keyof ITitulaireAnalyseMarginaleDto)[] = ["prenoms", "ordre"];

  private constructor(
    public readonly nom: string,
    public readonly prenoms: string[],
    public readonly ordre: number,
    public readonly typeDeclarationConjointe: keyof typeof ETypeDeclarationConjointe | null,
    public readonly dateDeclarationConjointe: DateRECE | null,
    public readonly nomPartie1: string,
    public readonly nomPartie2: string
  ) {}

  public static readonly depuisDto = (titulaireAnalyseMarginale: ITitulaireAnalyseMarginaleDto): TitulaireAnalyseMarginale | null => {
    if (TitulaireAnalyseMarginale.champsObligatoires.some(cle => titulaireAnalyseMarginale[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un titulaireProjetActeTranscrit n'est pas défini.`);
      return null;
    }

    return new TitulaireAnalyseMarginale(
      titulaireAnalyseMarginale.nom ?? "",
      titulaireAnalyseMarginale.prenoms,
      titulaireAnalyseMarginale.ordre,
      titulaireAnalyseMarginale.typeDeclarationConjointe ?? null,
      titulaireAnalyseMarginale.dateDeclarationConjointe
        ? DateRECE.depuisDateArrayDTO(titulaireAnalyseMarginale.dateDeclarationConjointe)
        : null,
      titulaireAnalyseMarginale.nomPartie1 ?? "",
      titulaireAnalyseMarginale.nomPartie2 ?? ""
    );
  };

  public readonly versDto = (): ITitulaireAnalyseMarginaleDto =>
    nettoyerAttributsDto<ITitulaireAnalyseMarginaleDto>({
      nom: this.nom,
      prenoms: this.prenoms,
      ordre: this.ordre,
      dateDeclarationConjointe: this.dateDeclarationConjointe?.versDateArrayDTO() || undefined,
      nomPartie1: this.nomPartie1,
      nomPartie2: this.nomPartie2,
      typeDeclarationConjointe: this.typeDeclarationConjointe ?? undefined
    });

  public readonly versTitulaireActe = (): TitulaireActe | null =>
    TitulaireActe.depuisDto({ ...this.versDto(), sexe: "INCONNU", filiations: [] });
}
