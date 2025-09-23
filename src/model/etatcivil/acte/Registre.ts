import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { TDateArrayDTO } from "@util/DateUtils";
import DateRECE from "../../../utils/DateRECE";
import { EFamilleRegistre } from "../enum/TypeFamille";
import { ITypeRegistreDto, TypeRegistre } from "./TypeRegistre";

export interface IRegistreDto {
  famille: keyof typeof EFamilleRegistre;
  type?: ITypeRegistreDto;
  annee: number;
  support1?: string;
  support2?: string;
  dateOuverture: TDateArrayDTO;
  dateFermeture?: TDateArrayDTO;
}

export class Registre {
  private static readonly champsObligatoires: (keyof IRegistreDto)[] = ["famille", "annee", "dateOuverture"];

  private constructor(
    public readonly famille: keyof typeof EFamilleRegistre,
    public readonly annee: number,
    public readonly type: TypeRegistre | null,
    public readonly support1: string | null,
    public readonly support2: string | null,
    public readonly dateOuverture: DateRECE,
    public readonly dateFermeture: DateRECE | null
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
      registre.support2 ?? null,
      DateRECE.depuisDateArrayDTO(registre.dateOuverture),
      registre.dateFermeture ? DateRECE.depuisDateArrayDTO(registre.dateFermeture) : null
    );
  };
}
