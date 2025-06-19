import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";

export interface ITitulaireRmcAutoRequeteDto {
  nom: string;
  prenoms: IPrenomOrdonneDto[];
}

export class TitulaireRmcAutoRequete {
  private static readonly champsObligatoires: (keyof ITitulaireRmcAutoRequeteDto)[] = ["nom", "prenoms"];

  private constructor(
    public readonly nom: string,
    public readonly prenoms: IPrenomOrdonneDto[]
  ) {}

  public static readonly depuisDto = (titulaire: ITitulaireRmcAutoRequeteDto): TitulaireRmcAutoRequete | null => {
    if (TitulaireRmcAutoRequete.champsObligatoires.some(cle => titulaire[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un TitulaireRmcAutoRequete n'est pas défini.`);
      return null;
    }

    return new TitulaireRmcAutoRequete(titulaire.nom, titulaire.prenoms);
  };
}
