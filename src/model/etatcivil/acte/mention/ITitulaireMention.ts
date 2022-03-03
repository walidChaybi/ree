import { Nationalite } from "../../enum/Nationalite";
import { Sexe } from "../../enum/Sexe";

export interface ITitulaireMention {
  ordre: number;

  nom: string;

  sexe: Sexe;

  nationalite: Nationalite;

  prenoms: string[];
}
