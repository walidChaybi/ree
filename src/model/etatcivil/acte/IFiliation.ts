import { IAdresse } from "./IAdresse";
import { IEvenement } from "./IEvenement";

export interface IFiliation {
  type: string;
  ordre: number;
  nom: string;
  sexe: string;
  naissance: IEvenement;
  profession: string;
  domicile: IAdresse;
  prenoms: string[];
}
