import { IDateCompose } from "../../../views/common/util/DateUtils";
import { IPrenom } from "./IPrenom";

export interface IInteresse {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  villeDeces: string;
  paysDeces: string;
  regionDeces: string;
  arrondissementDeces: string;
  nationalite: string;
  sexe: string;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: IPrenom[];
  dateNaissance: IDateCompose;
  dateDeces: IDateCompose;
}
