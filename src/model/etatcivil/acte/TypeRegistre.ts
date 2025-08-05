import { Options } from "@util/Type";
import { TypeFamille } from "../enum/TypeFamille";

export interface ITypeRegistre {
  id: string;
  famille: TypeFamille;
  pocopa: string;
  paysPocopa: string;
  dateRattachement: Date;
  dateTransfertScec: Date;
  gereScec: boolean;
  estOuvert: boolean;
}

export interface ITypeRegistreDto {
  id: string;
  pocopa: string;
}

export class TypeRegistre {
  private static readonly champsObligatoires: (keyof ITypeRegistreDto)[] = ["id", "pocopa"];

  private constructor(
    public readonly id: string,
    public readonly pocopa: string
  ) {}

  public static depuisDtos = (typeRegistres: ITypeRegistreDto[]): TypeRegistre[] => {
    return typeRegistres.map(dto => TypeRegistre.depuisDto(dto)).filter((item): item is TypeRegistre => item !== null);
  };

  public static depuisDto = (typeRegistre: ITypeRegistreDto): TypeRegistre | null => {
    if (TypeRegistre.champsObligatoires.some(cle => typeRegistre[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un typeRegistre n'est pas défini.`);
      return null;
    }

    return new TypeRegistre(typeRegistre.id, typeRegistre.pocopa);
  };

  public static readonly versOptions = (typeRegistres: ITypeRegistreDto[]): Options => {
    return typeRegistres.map(typeRegistre => ({
      cle: typeRegistre.pocopa,
      libelle: typeRegistre.pocopa
    }));
  };
}
