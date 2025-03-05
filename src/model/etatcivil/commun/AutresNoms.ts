import { AutresNoms, ETypeAutreNom } from "../enum/ETypeAutreNom";

// TODO: à supprimer après la refactorisation du mapping d'acte
export interface IAutresNoms {
  nom: string;
  type: AutresNoms;
}

export interface IAutreNomDto {
  nom: string;
  type: keyof typeof ETypeAutreNom;
}

export class AutreNom {
  private static readonly champsObligatoires: (keyof IAutreNomDto)[] = ["nom", "type"];

  private constructor(
    public readonly nom: string,
    public readonly type: ETypeAutreNom
  ) {}

  public static readonly depuisDto = (autreNom: IAutreNomDto): AutreNom | null => {
    switch (true) {
      case AutreNom.champsObligatoires.some(cle => autreNom[cle] === undefined):
        console.error(`Un champ obligatoire d'un AutreNom n'est pas défini.`);
        return null;
      case !Object.keys(ETypeAutreNom).includes(autreNom.type):
        console.error(
          `Le type de ${typeof autreNom} a la valeur ${autreNom.type} au lieu d'une des suivantes : ${Object.keys(ETypeAutreNom)}.`
        );
        return null;
    }

    return new AutreNom(autreNom.nom, ETypeAutreNom[autreNom.type]);
  };
}
