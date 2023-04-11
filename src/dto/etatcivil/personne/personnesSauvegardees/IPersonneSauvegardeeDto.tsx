import { Sexe } from "@model/etatcivil/enum/Sexe";
import { getValeurOuUndefined } from "@util/Utils";

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
      nom: getValeurOuUndefined(data.nom),
      autresNoms: getValeurOuUndefined(data.autresNoms),
      prenoms: getValeurOuUndefined(data.prenoms),
      lieuNaissance: getValeurOuUndefined(data.lieuNaissance),
      dateNaissance: getValeurOuUndefined(data.dateNaissance),
      sexe: Sexe.getEnumFor(data.sexe)
    };
  }
};
