import { Sexe } from "../enum/Sexe";
import { IDateCompose } from "../../../views/common/util/DateUtils";
import { IPrenom } from "../FicheInterfaces";
import { Nationalite } from "../enum/Nationalite";

export interface IPartenaire {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: Nationalite;
  sexe: Sexe;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: IPrenom[];
  dateNaissance: IDateCompose;
}
