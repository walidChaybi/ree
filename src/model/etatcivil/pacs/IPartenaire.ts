import { Sexe } from "../enum/Sexe";
import { IDateCompose } from "../../../views/common/util/DateUtils";
import { IPrenom } from "../FicheInterfaces";

export interface IPartenaire {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: string;
  sexe: Sexe;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: string[];
  dateNaissance: IDateCompose;
}
