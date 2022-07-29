/* istanbul ignore file */

import { getDateStringFromDateCompose } from "../../views/common/util/DateUtils";
import {
  formatNom,
  formatPrenom,
  numberToString,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../views/common/util/Utils";
import { Nationalite } from "../etatcivil/enum/Nationalite";
import { Sexe } from "../etatcivil/enum/Sexe";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";
import { IEvenementUnion } from "./IEvenementUnion";
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

  // Nouveaux champs création
  situationFamiliale?: string;
  villeEtrangereNaissance?: string;
  arrondissementNaissance?: string;
  regionNaissance?: string;
  nationalites?: INationalite[];
  domiciliation?: IDomiciliation;
  prenomsDemande?: IPrenomOrdonnes[];
  nomDemandeFrancisation?: string;
  nomDemandeIdentification?: string;
  nomActuel?: string;
  nombreEnfantMineur?: number;
  typeObjetTitulaire?: TypeObjetTitulaire;
  qualite?: string;
  courriel?: string;
  telephone?: string;

  // Titulaire creation Effet collectif
  parent2Enfant?: ITitulaireRequete;
  valideEffetCollectif?: string;
  demandeEffetCollectif?: boolean;

  // Titulaire creation Parent
  numeroDossierNational?: string;
  domiciliationEnfant?: string;

  // Titulaire creation Union
  evenementUnions?: IEvenementUnion[];
}

interface INationalite {
  id: string;
  nationalite: string;
}

interface IDomiciliation {
  id: string;
  ligne2?: string;
  ligne3?: string;
  ligne4?: string;
  ligne5?: string;
  codePostal?: string;
  ville?: string;
  villeEtrangere?: string;
  arrondissement?: string;
  region?: string;
  pays?: string;
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
  }
};
