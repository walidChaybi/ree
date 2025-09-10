import { IDate } from "@util/DateUtils";

export interface IRMCTitulaire {
  nom: string;
  prenom: string;
  paysNaissance: string;
  dateNaissance: IDate;
}

export interface IRMCTitulaireDto {
  nom?: string;
  prenom?: string;
  paysNaissance?: string;
  dateNaissance?: IDate;
}
