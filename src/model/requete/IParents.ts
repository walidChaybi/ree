import { IDateForm } from "@model/form/commun/DateForm";
import { DEUX, formatNom, formatPrenoms, UN } from "@util/Utils";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface ILocalisation {
  typeLieu?: "France" | "Étranger" | "Inconnu" | "";
  ville?: string;
  arrondissement?: string;
  departement?: string;
  etatProvince?: string;
  pays?: string;
  adresse?: string;
}

export interface IParent {
  id?: string;
  position?: number;
  sexe?: string;
  nomNaissance?: string;
  nom?: string;
  prenoms?: IPrenomOrdonnes[];
  prenomsChemin?: { [prenom: string]: string };
  dateNaissance?: IDateForm | null;
  lieuNaissance?: ILocalisation;
  profession?: string;
  sansProfession?: boolean;
  renseignerAge?: boolean;
  age?: string;
  domicile?: ILocalisation;
  typeObjetTitulaire?: TypeObjetTitulaire;
}

export const Parent = {
  getNom(parent?: IParent): string {
    return parent ? formatNom(parent.nomNaissance) : "";
  },
  getPrenoms(parent?: IParent): string {
    return parent?.prenoms && parent.prenoms.length > 0
      ? formatPrenoms([parent.prenoms[0].prenom, parent.prenoms[UN]?.prenom, parent.prenoms[DEUX]?.prenom])
      : "";
  },
  getPrenom(numero: number, parent?: IParent): string {
    let res = "";
    if (parent?.prenoms) {
      const prenom = parent.prenoms.find(element => element.numeroOrdre === numero);
      res = prenom?.prenom ?? "";
    }
    return res;
  }
};
