import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";
import { Options } from "@util/Type";

export interface ITypeRegistreDto {
  id: string;
  poste?: string;
  pocopa?: string;
}

export class TypeRegistre {
  private static readonly champsObligatoires: (keyof ITypeRegistreDto)[] = ["id"];

  private constructor(
    public readonly id: string,
    public readonly poste?: string,
    public readonly pocopa?: string
  ) {}

  public static readonly depuisDtos = (typeRegistres: ITypeRegistreDto[]): TypeRegistre[] => {
    return typeRegistres.map(dto => TypeRegistre.depuisDto(dto)).filter((item): item is TypeRegistre => item !== null);
  };

  public static readonly depuisDto = (typeRegistre: ITypeRegistreDto): TypeRegistre | null => {
    if (champsObligatoiresDuDtoAbsents("ITypeRegistreDto", typeRegistre, this.champsObligatoires)) return null;

    return new TypeRegistre(typeRegistre.id, typeRegistre?.poste, typeRegistre?.pocopa);
  };

  public static readonly versOptions = (typeRegistres: ITypeRegistreDto[]): Options => {
    return typeRegistres
      .map(typeRegistre => {
        return {
          cle: typeRegistre.id ?? "",
          libelle: typeRegistre.poste ?? ""
        };
      })
      .filter(option => option.cle !== "");
  };

  public static readonly getTypeDeRegistre = (typeRegistres: ITypeRegistreDto[]) =>
    typeRegistres.find(typeRegistre => typeRegistre.pocopa) ? "pocopa" : "poste";
}
