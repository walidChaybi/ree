import { IDateCompose } from "../../../views/common/util/DateUtils";
import { IPrenom } from "../fiche/IPrenom";
import { Nationalite } from "../enum/Nationalite";
import { Sexe } from "../enum/Sexe";

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
