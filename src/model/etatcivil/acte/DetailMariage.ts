import { valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import EExistenceContratMariage from "../enum/EExistenceContratMariage";

export interface IDetailMariageDto {
  existenceContrat?: keyof typeof EExistenceContratMariage;
  contrat?: string;
}

export class DetailMariage {
  private constructor(
    public readonly existenceContrat?: keyof typeof EExistenceContratMariage,
    public readonly contrat?: string
  ) {}

  public static readonly depuisDto = (detailMariage: IDetailMariageDto): DetailMariage | null => {
    if (valeurDtoAbsenteDansEnum("IDetailMariageDto", detailMariage, "existenceContrat", EExistenceContratMariage)) return null;

    return new DetailMariage(detailMariage.existenceContrat, detailMariage.contrat);
  };
}
