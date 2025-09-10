import { IDate } from "@util/DateUtils";

export interface IRMCEvenement {
  dateEvenement: IDate;
  paysEvenement: string;
}

export interface IRMCEvenementDto {
  dateEvenement?: IDate;
  paysEvenement?: string;
}
