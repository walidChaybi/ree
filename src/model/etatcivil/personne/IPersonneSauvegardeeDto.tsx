import { ESexe } from "@model/etatcivil/enum/Sexe";

export interface IPersonneSauvegardeeDto {
  idPersonne: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  sexe?: keyof typeof ESexe;
}
