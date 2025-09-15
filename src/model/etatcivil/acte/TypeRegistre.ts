import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";
import { Options } from "@util/Type";
import { TypeFamille } from "../enum/TypeFamille";

export interface ITypeRegistre {
  id: string;
  idTypeRegistre?: string;
  famille: TypeFamille;
  pocopa: string;
  paysPocopa: string;
  dateRattachement: Date;
  dateTransfertScec: Date;
  gereScec: boolean;
  estOuvert: boolean;
}

export interface ITypeRegistreRequeteDto {
  idTypeRegistre: string;
  poste: string;
}

export interface ITypeRegistrePocopaDto {
  id: string;
  poste: string;
  pocopa: string;
}

export class TypeRegistrePocopa {
  private static readonly champsObligatoires: (keyof ITypeRegistrePocopaDto)[] = ["id"];

  private constructor(
    public readonly id: string,
    public readonly poste: string,
    public readonly pocopa: string
  ) {}

  public static readonly depuisDtos = (typeRegistres: ITypeRegistrePocopaDto[]): TypeRegistrePocopa[] => {
    return typeRegistres.map(dto => TypeRegistrePocopa.depuisDto(dto)).filter((item): item is TypeRegistrePocopa => item !== null);
  };

  public static readonly depuisDto = (typeRegistre: ITypeRegistrePocopaDto): TypeRegistrePocopa | null => {
    if (champsObligatoiresDuDtoAbsents("TypeRegistre", typeRegistre, this.champsObligatoires)) {
      console.error(`Un champ obligatoire d'un typeRegistre n'est pas défini.`);
      return null;
    }
    return new TypeRegistrePocopa(typeRegistre.id, typeRegistre.poste ?? "", typeRegistre.pocopa ?? "");
  };

  public static readonly versOptionsPoste = (typeRegistres: ITypeRegistrePocopaDto[]): Options => {
    return typeRegistres.map(typeRegistre => ({
      cle: typeRegistre.poste,
      libelle: typeRegistre.poste
    }));
  };
}
