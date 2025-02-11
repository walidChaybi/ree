/* istanbul ignore file */

import DateUtils from "@util/DateUtils";
import { DEUX, formatNom, getValeurOuVide, numberToString, UN } from "@util/Utils";
import { Nationalite } from "../etatcivil/enum/Nationalite";
import { Sexe } from "../etatcivil/enum/Sexe";
import { INationalite } from "./INationalite";
import { IParent } from "./IParents";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface ITitulaireRequete {
  id: string;
  position: number;
  nomNaissance?: string;
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
  numeroDossierNational?: string;
}

export const TitulaireRequete = {
  getNom(titulaire?: ITitulaireRequete): string {
    return titulaire ? formatNom(titulaire.nomNaissance) : "";
  },
  getPrenom(numero: number, titulaire: ITitulaireRequete): string {
    let res = "";
    if (titulaire?.prenoms) {
      const prenom = titulaire.prenoms.find(element => element.numeroOrdre === numero);
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
    return `${this.getPrenom1(titulaire)}${this.getPrenom2(titulaire) ? " " : ""}${this.getPrenom2(titulaire)}${
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
    return titulaire?.anneeNaissance
      ? DateUtils.getDateStringFromDateCompose({
          jour: numberToString(titulaire.jourNaissance),
          mois: numberToString(titulaire.moisNaissance),
          annee: numberToString(titulaire.anneeNaissance)
        })
      : "";
  },
  getSexe(titulaire?: ITitulaireRequete): string {
    return titulaire?.sexe ? Sexe.getEnumFor(titulaire.sexe).libelle : "";
  },
  getVille(titulaire?: ITitulaireRequete): string {
    return getValeurOuVide(titulaire?.villeNaissance);
  },
  getPays(titulaire?: ITitulaireRequete): string {
    return getValeurOuVide(titulaire?.paysNaissance);
  },
  getLieuNaissance(titulaire?: ITitulaireRequete): string {
    let lieuNaissance = "";

    if (titulaire?.villeNaissance) {
      lieuNaissance = this.getVille(titulaire);
    }

    if (titulaire?.paysNaissance) {
      lieuNaissance += lieuNaissance !== "" ? ", " : "";
      lieuNaissance += this.getPays(titulaire);
    }

    return lieuNaissance;
  },
  getParentsTries(parents?: IParent[]) {
    return parents?.filter(parent => parent.position !== undefined).sort((a, b) => (a.position as number) - (b.position as number));
  },
  getTitulaireParPosition(titulaires: ITitulaireRequete[], position: number): ITitulaireRequete | undefined {
    return titulaires.find(titulaire => titulaire.position === position);
  },
  getParent(titulaire: ITitulaireRequete | undefined, position: number): IParent | undefined {
    let parent: IParent | undefined;

    if (titulaire) {
      parent = titulaire.parentsTitulaire?.find(parentTitulaire => parentTitulaire.position === position);
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
