/* istanbul ignore file */

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
  dateNaissance?: IDateForm | null;
  lieuNaissance?: ILocalisation;
  profession?: string;
  sansProfession?: boolean;
  renseignerAge?: boolean;
  age?: string;
  domicile?: ILocalisation;
  typeObjetTitulaire?: TypeObjetTitulaire;
}

export interface IParents {
  parent1: IParent;
  parent2: IParent;
  domicileCommun?: boolean;
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
  getTableauDePrenoms(parent?: IParent): string[] {
    const prenoms: string[] = [];
    parent?.prenoms?.forEach((prenom: IPrenomOrdonnes) => {
      prenoms.push(prenom.prenom);
    });

    return prenoms;
  },
  getPrenom(numero: number, parent?: IParent): string {
    let res = "";
    if (parent?.prenoms) {
      const prenom = parent.prenoms.find(element => element.numeroOrdre === numero);
      res = prenom?.prenom ?? "";
    }
    return res;
  },
  getPrenom1(parent: IParent): string {
    return this.getPrenom(1, parent);
  },
  getPrenom2(parent: IParent): string {
    const indexPrenom = 2;
    return this.getPrenom(indexPrenom, parent);
  },
  getPrenom3(parent: IParent): string {
    const indexPrenom = 3;
    return this.getPrenom(indexPrenom, parent);
  }
};
