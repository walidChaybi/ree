/* istanbul ignore file */

import { getDateStringFromDateCompose } from "../../../views/common/util/DateUtils";
import {
  formatNom,
  formatPrenom,
  numberToString,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../views/common/util/Utils";
import { Nationalite } from "../../etatcivil/enum/Nationalite";
import { Sexe } from "../../etatcivil/enum/Sexe";
import { IParent } from "./IParents";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface ITitulaireRequete {
  id: string;
  position: number;
  nomNaissance: string;
  nomUsage?: string;
  prenoms?: IPrenomOrdonnes[];
  jourNaissance?: number;
  moisNaissance?: number;
  anneeNaissance?: number;
  villeNaissance?: string;
  paysNaissance?: string;
  sexe: string;
  nationalite: Nationalite;
  parentsTitulaire?: IParent[];
}

export const TitulaireRequete = {
  getNom(titulaire?: ITitulaireRequete): string {
    return titulaire ? formatNom(titulaire.nomNaissance) : "";
  },
  getPrenom(numero: number, titulaire: ITitulaireRequete): string {
    let res = "";
    if (titulaire && titulaire.prenoms) {
      const prenom = titulaire.prenoms.find(
        element => element.numeroOrdre === numero
      );
      res = prenom ? formatPrenom(prenom.prenom) : "";
    }
    return res;
  },
  getPrenom1(titulaire: ITitulaireRequete): string {
    return this.getPrenom(1, titulaire);
  },
  getPrenom2(titulaire: ITitulaireRequete): string {
    return this.getPrenom(2, titulaire);
  },
  getPrenom3(titulaire: ITitulaireRequete): string {
    const indexPrenom3 = 3;
    return this.getPrenom(indexPrenom3, titulaire);
  },
  getPrenoms(titulaire: ITitulaireRequete): string {
    return `${this.getPrenom1(titulaire)}${
      this.getPrenom2(titulaire) ? " " : ""
    }${this.getPrenom2(titulaire)}${
      this.getPrenom3(titulaire) ? " " : ""
    }${this.getPrenom3(titulaire)}`;
  },
  getDateNaissance(titulaire?: ITitulaireRequete): string {
    return titulaire && titulaire.anneeNaissance
      ? getDateStringFromDateCompose({
          jour: numberToString(titulaire.jourNaissance),
          mois: numberToString(titulaire.moisNaissance),
          annee: numberToString(titulaire.anneeNaissance)
        })
      : "";
  },
  getSexe(titulaire?: ITitulaireRequete): string {
    return titulaire && titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe).libelle
      : "";
  },
  getVille(titulaire?: ITitulaireRequete): string {
    return titulaire && titulaire.villeNaissance
      ? premiereLettreEnMajusculeLeResteEnMinuscule(titulaire.villeNaissance)
      : "";
  },
  getPays(titulaire?: ITitulaireRequete): string {
    return titulaire && titulaire.paysNaissance
      ? premiereLettreEnMajusculeLeResteEnMinuscule(titulaire.paysNaissance)
      : "";
  }
};
