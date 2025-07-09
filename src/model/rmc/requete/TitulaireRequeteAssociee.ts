export interface ITitulaireRequeteAssocieeDto {
  nom: string;
  prenom?: string;
}

export class TitulaireRequeteAssociee {
  private static readonly champsObligatoires: (keyof ITitulaireRequeteAssocieeDto)[] = ["nom"];

  protected constructor(
    public readonly nom: string,
    public readonly prenom: string
  ) {}

  public static readonly depuisDto = (titulaire: ITitulaireRequeteAssocieeDto): TitulaireRequeteAssociee | null => {
    if (TitulaireRequeteAssociee.champsObligatoires.some(cle => titulaire[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un TitulaireRmcAutoRequete n'est pas défini.`);
      return null;
    }

    return new TitulaireRequeteAssociee(titulaire.nom, titulaire.prenom ?? "");
  };

  protected get attributs(): [nom: string, prenom: string] {
    return [this.nom, this.prenom];
  }
}
