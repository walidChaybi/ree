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
import { IPrenom } from "../../etatcivil/fiche/IPrenom";
import { IParent } from "./IParents";

export interface ITitulaireRequete {
  id: string;
  position: number;
  nomNaissance: string;
  nomUsage?: string;
  prenoms?: IPrenom[];
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
  getPrenom(numero: number, titulaire?: ITitulaireRequete): string {
    return titulaire && titulaire.prenoms && titulaire.prenoms[numero]
      ? formatPrenom(titulaire.prenoms[numero].valeur)
      : "";
  },
  getPrenom1(titulaire?: ITitulaireRequete): string {
    return this.getPrenom(0, titulaire);
  },
  getPrenom2(titulaire?: ITitulaireRequete): string {
    return this.getPrenom(1, titulaire);
  },
  getPrenom3(titulaire?: ITitulaireRequete): string {
    const indexPrenom3 = 2;
    return this.getPrenom(indexPrenom3, titulaire);
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
