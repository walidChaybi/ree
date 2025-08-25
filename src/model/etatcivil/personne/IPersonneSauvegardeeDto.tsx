import { Sexe } from "@model/etatcivil/enum/Sexe";

export interface IPersonneSauvegardeeDto {
  idPersonne: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  sexe?: Sexe;
}

export const PersonneSauvegardeeDto = {
  mapping(data: any): IPersonneSauvegardeeDto {
    return {
      idPersonne: data.idPersonne,
      nom: data.nom,
      autresNoms: data.autresNoms,
      prenoms: data.prenoms,
      lieuNaissance: data.lieuNaissance,
      dateNaissance: data.dateNaissance,
      sexe: Sexe.getEnumFor(data.sexe)
    };
  }
};
