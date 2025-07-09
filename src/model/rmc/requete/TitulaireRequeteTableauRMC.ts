import { IDateDto } from "@util/DateUtils";
import DateRECE from "../../../utils/DateRECE";
import { ITitulaireRequeteAssocieeDto, TitulaireRequeteAssociee } from "./TitulaireRequeteAssociee";

export interface ITitulaireRequeteTableauRMCDto extends ITitulaireRequeteAssocieeDto {
  dateNaissance?: IDateDto;
}

export class TitulaireRequeteTableauRMC extends TitulaireRequeteAssociee {
  private constructor(
    titulaireRequeteAssociee: TitulaireRequeteAssociee,
    /**format JJ/MM/AAAA */
    public readonly dateNaissance: string
  ) {
    super(...(titulaireRequeteAssociee as TitulaireRequeteTableauRMC).attributs);
  }

  public static readonly depuisDto = (titulaire: ITitulaireRequeteTableauRMCDto): TitulaireRequeteTableauRMC | null => {
    const titulaireRequeteAssociee = TitulaireRequeteAssociee.depuisDto({ nom: titulaire.nom, prenom: titulaire.prenom });

    return (
      titulaireRequeteAssociee &&
      new TitulaireRequeteTableauRMC(
        titulaireRequeteAssociee,
        titulaire.dateNaissance ? DateRECE.depuisObjetDate(titulaire.dateNaissance).format("JJ/MM/AAAA") : ""
      )
    );
  };
}
