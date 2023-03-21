/* istanbul ignore file */

import { getDateStringFromDateCompose } from "@util/DateUtils";
import {
  DEUX,
  formatNom,
  getValeurOuVide,
  numberToString,
  UN
} from "@util/Utils";
import { Nationalite } from "../etatcivil/enum/Nationalite";
import { Sexe } from "../etatcivil/enum/Sexe";
import { INationalite } from "./INationalite";
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
  // TODO : utiliser la class Sexe
  sexe: string;
  nationalite: Nationalite;
  parentsTitulaire?: IParent[];
  codePostalNaissance?: string;
  situationFamiliale?: string;
  lieuNaissanceFormate?: string;
  dateNaissanceFormatee?: string;
  paysStatutRefugie?: string;
  paysOrigine?: string;
  nationalites?: INationalite[];
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
      res = prenom?.prenom ?? "";
    }
    return res;
  },
  getPrenom1(titulaire: ITitulaireRequete): string {
    return this.getPrenom(1, titulaire);
  },
  getPrenom2(titulaire: ITitulaireRequete): string {
    const indexPrenom = 2;
    return this.getPrenom(indexPrenom, titulaire);
  },
  getPrenom3(titulaire: ITitulaireRequete): string {
    const indexPrenom = 3;
    return this.getPrenom(indexPrenom, titulaire);
  },
  getPrenoms(titulaire: ITitulaireRequete): string {
    return `${this.getPrenom1(titulaire)}${
      this.getPrenom2(titulaire) ? " " : ""
    }${this.getPrenom2(titulaire)}${
      this.getPrenom3(titulaire) ? " " : ""
    }${this.getPrenom3(titulaire)}`;
  },
  getTableauDePrenoms(titulaire?: ITitulaireRequete): string[] {
    const prenoms: string[] = [];
    titulaire?.prenoms?.forEach((prenom: IPrenomOrdonnes) => {
      prenoms.push(prenom.prenom);
    });

    return prenoms;
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
    return getValeurOuVide(titulaire?.villeNaissance);
  },
  getPays(titulaire?: ITitulaireRequete): string {
    return getValeurOuVide(titulaire?.paysNaissance);
  },
  getLieuNaissance(titulaire?: ITitulaireRequete): string {
    let lieuNissance = "";

    if (titulaire && titulaire.villeNaissance) {
      lieuNissance = this.getVille(titulaire);
    }

    if (titulaire && titulaire.paysNaissance) {
      lieuNissance += lieuNissance !== "" ? ", " : "";
      lieuNissance += this.getPays(titulaire);
    }

    return lieuNissance;
  },
  getParentsTries(parents?: IParent[]) {
    return parents?.sort((a, b) => a.position - b.position);
  },
  getTitulaireByPosition({
    titulaires,
    position
  }: {
    titulaires?: ITitulaireRequete[];
    position: number;
  }): ITitulaireRequete | undefined {
    return titulaires
      ? titulaires.find(titulaire => {
          return titulaire.position === position;
        })
      : undefined;
  },
  getParent(
    titulaire: ITitulaireRequete | undefined,
    position: number
  ): IParent | undefined {
    let parent: IParent | undefined;

    if (titulaire) {
      parent = titulaire.parentsTitulaire?.find(
        parentTitulaire => parentTitulaire.position === position
      );
    }

    return parent;
  },
  getParent1(titulaire?: ITitulaireRequete): IParent | undefined {
    return this.getParent(titulaire, UN);
  },
  getParent2(titulaire?: ITitulaireRequete): IParent | undefined {
    return this.getParent(titulaire, DEUX);
  }
};
