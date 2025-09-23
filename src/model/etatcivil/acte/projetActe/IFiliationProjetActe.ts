import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { IAdresse } from "../IAdresse";
import { IEvenement } from "../IEvenement";

export interface IFiliationProjetActeTranscrit {
  lienParente: ELienParente;
  ordre: number;
  nom: string;
  sexe: string;
  naissance: IEvenement | null;
  age: number | null;
  sansProfession?: boolean | null;
  profession: string | null;
  domicile: IAdresse | null;
  prenoms: string[] | null;
  domicileCommun?: boolean;
}
