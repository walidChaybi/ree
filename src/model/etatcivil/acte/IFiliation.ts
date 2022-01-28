import { LienParente } from "../enum/LienParente";
import { IAdresse } from "./IAdresse";
import { IEvenement } from "./IEvenement";

export interface IFiliation {
  lienParente: LienParente;
  ordre: number;
  nom: string;
  sexe: string;
  naissance: IEvenement;
  age: number;
  profession: string;
  domicile: IAdresse;
  prenoms: string[];
}
