import { ITitulaireDto } from "./ITitulaireDto";

export interface IAnalyseMarginaleDto {
  id: string | null;
  dateDebut: Date | null;
  dateFin?: Date | null;
  nomOec: string | null;
  prenomOec: string | null;
  motifModification: string | null;
  titulaires: ITitulaireDto[] | null;
}
