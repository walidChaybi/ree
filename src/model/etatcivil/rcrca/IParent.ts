import { IDateCompose } from "@util/DateUtils";
import { ELienParente } from "../enum/ELienParente";
import { IPrenom } from "../fiche/IPrenom";

export interface IParent {
  numeroOrdre: number;
  nomFamille: string;
  sexe: string;
  lienParente: ELienParente;
  prenomsParents?: IPrenom[];
  dateNaissance?: IDateCompose;
  villeNaissance?: string;
  paysNaissance?: string;
  regionNaissance?: string;
  arrondissementNaissance?: string;
}
