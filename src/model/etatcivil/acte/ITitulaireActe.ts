import { getDateStringFromDateCompose } from "../../../views/common/util/DateUtils";
import {
  formatNom,
  formatPrenom,
  numberToString
} from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../../views/common/utilMetier/LieuxUtils";
import { LienParente } from "../enum/LienParente";
import { Sexe } from "../enum/Sexe";
import { TypeDeclarationConjointe } from "../enum/TypeDeclarationConjointe";
import { IAdresse } from "./IAdresse";
import { IEvenement } from "./IEvenement";
import { IFiliation } from "./IFiliation";

export interface ITitulaireActe {
  nom?: string;
  ordre: number;
  prenoms?: string[];
  sexe?: string;
  naissance?: IEvenement;
  age?: number;
  profession?: string;
  domicile?: IAdresse;
  filiations?: IFiliation[];
  nomPartie1?: string;
  nomPartie2?: string;
  nomAvantMariage?: string;
  nomApresMariage?: string;
  nomDernierConjoint?: string;
  prenomsDernierConjoint?: string;
  typeDeclarationConjointe?: TypeDeclarationConjointe; // concerne les titulaires de l'analyse marginale
  dateDeclarationConjointe?: Date; // concerne les titulaires de l'analyse marginale
}

export const TitulaireActe = {
  getNom(titulaire?: ITitulaireActe): string {
    return titulaire ? formatNom(titulaire.nom) : "";
  },
  getPrenom(numero: number, titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.prenoms
      ? formatPrenom(titulaire.prenoms[numero])
      : "";
  },
  getPrenom1(titulaire?: ITitulaireActe): string {
    return this.getPrenom(0, titulaire);
  },
  getPrenom2(titulaire?: ITitulaireActe): string {
    return this.getPrenom(1, titulaire);
  },
  getPrenom3(titulaire?: ITitulaireActe): string {
    const deux = 2;
    return this.getPrenom(deux, titulaire);
  },
  getPrenoms(titulaire?: ITitulaireActe): string {
    return `${this.getPrenom1(titulaire)}${
      this.getPrenom2(titulaire) ? " " : ""
    }${this.getPrenom2(titulaire)}${
      this.getPrenom3(titulaire) ? " " : ""
    }${this.getPrenom3(titulaire)}`;
  },
  getDateNaissance(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.naissance
      ? getDateStringFromDateCompose({
          jour: numberToString(titulaire.naissance.jour),
          mois: numberToString(titulaire.naissance.mois),
          annee: numberToString(titulaire.naissance.annee)
        })
      : "";
  },
  getSexeOuVide(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe).libelle
      : "";
  },
  getSexeOuInconnu(titulaire?: ITitulaireActe | IFiliation): Sexe {
    return titulaire && titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe)
      : Sexe.INCONNU;
  },
  getLieuNaissance(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.naissance
      ? LieuxUtils.getLieu(
          titulaire.naissance.ville,
          titulaire.naissance.region,
          titulaire.naissance.pays,
          titulaire.naissance.arrondissement
        )
      : "";
  },
  getParents(titulaire?: ITitulaireActe): IFiliation[] {
    return titulaire && titulaire.filiations
      ? titulaire.filiations.filter(
          filiation =>
            filiation.lienParente === LienParente.PARENT ||
            LienParente.PARENT_ADOPTANT ||
            LienParente.ADOPTANT_CONJOINT_DU_PARENT
        )
      : [];
  }
};
