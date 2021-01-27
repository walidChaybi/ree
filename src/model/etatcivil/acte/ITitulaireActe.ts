import { IEvenement } from "./IEvenement";
import { IAdresse } from "./IAdresse";
import { IFiliation } from "./IFiliation";
import { Sexe } from "../Sexe";

export interface ITitulaireActe {
  nom: string;
  ordre: number;
  prenoms: string[];
  sexe: Sexe;
  naissance: IEvenement;
  profession: string;
  domicile: IAdresse;
  filiations: IFiliation[];
}
