import { LienParente } from "@model/etatcivil/enum/LienParente";
import { IAdresse } from "../IAdresse";
import { IEvenement } from "../IEvenement";
export interface IProjetFiliation {
  lienParente: LienParente;
  ordre: number;
  nom: string;
  sexe: string;
  naissance: IEvenement | null;
  age: number;
  profession: string;
  domicile: IAdresse;
  prenoms: string[];
}
