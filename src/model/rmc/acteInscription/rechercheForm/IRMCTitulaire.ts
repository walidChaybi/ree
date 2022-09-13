import { IDateCompose } from "@util/DateUtils";

export interface IRMCTitulaire {
  nom?: string;
  prenom?: string;
  dateNaissance?: IDateCompose;
  paysNaissance?: string;
}
