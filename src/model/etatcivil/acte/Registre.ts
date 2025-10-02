import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { EFamilleRegistre } from "../enum/TypeFamille";
import { ITypeRegistreDto, TypeRegistre } from "./TypeRegistre";

export interface IRegistreDto {
  famille: keyof typeof EFamilleRegistre;
  annee: number;
  type?: ITypeRegistreDto;
  support1?: string;
  support2?: string;
}

export class Registre {
  private static readonly champsObligatoires: (keyof IRegistreDto)[] = ["famille", "annee"];

  private constructor(
    public readonly famille: keyof typeof EFamilleRegistre,
    public readonly annee: number,
    public readonly type: TypeRegistre | null,
    public readonly support1: string | null,
    public readonly support2: string | null
  ) {}

  public static readonly depuisDto = (registre: IRegistreDto): Registre | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IRegistreDto", registre, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IRegistreDto", registre, "famille", EFamilleRegistre):
        return null;
    }

    return new Registre(
      registre.famille,
      registre.annee,
      registre.type ? TypeRegistre.depuisDto(registre.type) : null,
      registre.support1 ?? null,
      registre.support2 ?? null
    );
  };
}
