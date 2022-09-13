import { IDateCompose } from "@util/DateUtils";
import { LienParente } from "../enum/LienParente";
import { IPrenom } from "../fiche/IPrenom";

export interface IParent {
  numeroOrdre: number;
  nomFamille: string;
  sexe: string;
  lienParente: LienParente;
  prenomsParents?: IPrenom[];
  dateNaissance?: IDateCompose;
  villeNaissance?: string;
  paysNaissance?: string;
  regionNaissance?: string;
  arrondissementNaissance?: string;
}
