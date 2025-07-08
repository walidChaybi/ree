import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";

export interface ITitulaireRequeteAssocieeDto {
  nom: string;
  prenoms: Omit<IPrenomOrdonneDto, "estPrenomFrRetenuSdanf">[];
}

export class TitulaireRequeteAssociee {
  private static readonly champsObligatoires: (keyof ITitulaireRequeteAssocieeDto)[] = ["nom", "prenoms"];

  protected constructor(
    public readonly nom: string,
    public readonly prenoms: Omit<IPrenomOrdonneDto, "estPrenomFrRetenuSdanf">[]
  ) {}

  public static readonly depuisDto = (titulaire: ITitulaireRequeteAssocieeDto): TitulaireRequeteAssociee | null => {
    if (TitulaireRequeteAssociee.champsObligatoires.some(cle => titulaire[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un TitulaireRmcAutoRequete n'est pas défini.`);
      return null;
    }

    return new TitulaireRequeteAssociee(titulaire.nom, titulaire.prenoms);
  };

  protected get attributs(): [nom: string, prenoms: Omit<IPrenomOrdonneDto, "estPrenomFrRetenuSdanf">[]] {
    return [this.nom, this.prenoms];
  }
}
