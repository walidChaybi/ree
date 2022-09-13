import { IDateCompose } from "@util/DateUtils";
import { Nationalite } from "../enum/Nationalite";
import { Sexe } from "../enum/Sexe";
import { IPrenom } from "../fiche/IPrenom";
import { IParent } from "./IParent";

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
  parents?: IParent[];
}

export const Interesse = {
  getSexe(interesse?: IInteresse): string {
    return interesse && interesse.sexe
      ? Sexe.getEnumFor(interesse.sexe).libelle
      : "";
  },
  getNationalite(interesse?: IInteresse): string {
    return interesse && interesse.nationalite
      ? Nationalite.getEnumFor(interesse.nationalite).libelle
      : "";
  }
};
