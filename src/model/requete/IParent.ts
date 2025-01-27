import { Sexe } from "@model/etatcivil/enum/Sexe";
import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";

export interface ILocation {
  type?: "France" | "Étranger" | "Inconnu" | "";
  ville?: string;
  arrondissement?: string;
  departement?: string;
  etatProvince?: string;
  pays?: string;
  adresse?: string;
}

export interface IParent {
  sexe: Sexe;
  nom: string;
  prenoms: Record<string, string>;
  dateNaissance?: DateCoordonneesType;
  lieuNaissance: ILocation;
  profession?: string;
  sansProfession: boolean;
  renseignerAge: boolean;
  age?: string;
  domicile: ILocation;
}

export interface IParents {
  parent1: IParent;
  parent2: IParent;
  domicileCommun: boolean;
}
