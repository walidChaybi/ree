import { IDateCompose } from "../../../views/common/util/DateUtils";
import { LienParente } from "../enum/LienParente";
import { IPrenom } from "../fiche/IPrenom";

export interface IParent {
  numeroOrdre: number;
  nomFamille: string;
  sexe: string;
  lienParente: LienParente;
  prenoms?: IPrenom[];
  dateNaissance?: IDateCompose;
  villeNaissance?: string;
  paysNaissance?: string;
  regionNaissance?: string;
  arrondissementNaissance?: string;
}
