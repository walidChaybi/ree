import { IDateCompose } from "../../../views/common/util/DateUtils";
import { IPrenom } from "../FicheInterfaces";
import { Nationalite } from "../enum/Nationalite";
import { EnumTypeSexe } from "../../../views/common/util/enum/EnumSexe";

export interface IPartenaire {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: Nationalite;
  sexe: string;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: IPrenom[];
  dateNaissance: IDateCompose;
}
