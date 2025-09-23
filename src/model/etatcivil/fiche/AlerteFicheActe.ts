import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";
import { ITypeAlerte, TypeAlerte } from "../enum/TypeAlerte";

export interface IAlerteFicheActeDto {
  alerte: string;
  complementDescription: string;
  idUtilisateur: string;
  dateCreation: number;
  idTypeAlerte: string;
}

export class AlerteFicheActe {
  private static readonly champsObligatoires: (keyof IAlerteFicheActeDto)[] = [
    "alerte",
    "complementDescription",
    "dateCreation",
    "idTypeAlerte",
    "idUtilisateur"
  ];

  private constructor(
    public readonly alerte: string,
    public readonly complementDescription: string,
    public readonly idUtilisateur: string,
    public readonly dateCreation: number,
    public readonly type: ITypeAlerte
  ) {}

  public static readonly depuisDto = (alerte: IAlerteFicheActeDto): AlerteFicheActe | null => {
    if (champsObligatoiresDuDtoAbsents("IAlerteFicheActeDto", alerte, this.champsObligatoires)) return null;

    const typeAlerte = TypeAlerte.depuisId(alerte.idTypeAlerte);
    if (!typeAlerte) {
      console.error("L'idTypeAlerte d'un IAlerteFicheActeDto ne correspond pas aux nomenclatures");
      return null;
    }

    return new AlerteFicheActe(alerte.alerte, alerte.complementDescription, alerte.idUtilisateur, alerte.dateCreation, typeAlerte);
  };
}
