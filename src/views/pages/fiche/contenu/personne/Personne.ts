import {
  formatNom,
  formatPrenom,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../../common/util/Utils";
import { LieuxUtils } from "../../../../../model/Lieux";
import {
  IDateCompose,
  getDateStringFromDateCompose
} from "../../../../common/util/DateUtils";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { AutresNoms } from "../../../../../model/etatcivil/enum/AutresNoms";

export interface IPersonne {
  nom: string;
  autresNoms: IAutresNoms[];
  prenoms: string[];
  autresPrenoms: string[];
  lieuNaissance: ILieuEvenement;
  dateNaissance: IDateCompose;
  nationalite: string;
  dateDeces?: IDateCompose;
  lieuDeces?: ILieuEvenement;
  sexe: Sexe;
  parents: IFamille[];
  enfants: IFamille[];
  actes: IFicheLienActes[];
  pacss: IFicheLien[];
  rcs: IFicheLien[];
  rcas: IFicheLien[];
}

export interface IFicheLien {
  numero: string;
  id: string;
}

export interface IFicheLienActes {
  numero: string;
  id: string;
  nature: NatureActe;
}
export interface IFamille {
  nom: string;
  prenoms: string[];
}

export interface ILieuEvenement {
  pays: string;
  ville: string;
  region: string;
  arrondissement: string;
}

export interface IAutresNoms {
  nom: string;
  type: AutresNoms;
}

export const Personne = {
  getNom(personne: IPersonne): string {
    return formatNom(personne.nom);
  },

  getAutresNoms(personne: IPersonne): string {
    return personne.autresNoms
      .map(nom => {
        const typeNom = ` (${nom.type.libelle})`;
        return `${formatNom(nom.nom)}${
          AutresNoms.isAutre(nom.type) ? "" : typeNom
        }`;
      })
      .join(", ");
  },

  getPrenoms(personne: IPersonne): string {
    return personne.prenoms.map(prenom => formatPrenom(prenom)).join(", ");
  },

  getAutresPrenom(personne: IPersonne): string {
    return personne.autresPrenoms
      .map(autrePrenom => formatPrenom(autrePrenom))
      .join(", ");
  },

  getLieuNaissance(personne: IPersonne): string {
    return LieuxUtils.getLieu(
      personne.lieuNaissance.ville,
      personne.lieuNaissance.region,
      personne.lieuNaissance.pays,
      personne.lieuNaissance.arrondissement
    );
  },

  getLieuDeces(personne: IPersonne): string {
    return personne.lieuDeces
      ? LieuxUtils.getLieu(
          personne.lieuDeces.ville,
          personne.lieuDeces.region,
          personne.lieuDeces.pays,
          personne.lieuDeces.arrondissement
        )
      : "";
  },

  getDateNaissance(personne: IPersonne): string {
    return getDateStringFromDateCompose(personne.dateNaissance);
  },

  getDateDeces(personne: IPersonne): string {
    return personne.dateDeces
      ? getDateStringFromDateCompose(personne.dateDeces)
      : "";
  },

  getNationalite(personne: IPersonne): string {
    return premiereLettreEnMajusculeLeResteEnMinuscule(personne.nationalite);
  },

  getSexe(personne: IPersonne): string {
    return personne.sexe.libelle;
  },

  getParents(personne: IPersonne): IFamille[] {
    return personne.parents;
  },

  getEnfants(personne: IPersonne): IFamille[] {
    return personne.enfants;
  },

  getActes(personne: IPersonne): IFicheLienActes[] {
    return personne.actes;
  },

  getPacss(personne: IPersonne, numeroFiche?: string): IFicheLien[] {
    return personne.pacss;
  },

  getRcs(personne: IPersonne, numeroFiche?: string): IFicheLien[] {
    return personne.rcs;
  },

  getRcas(personne: IPersonne, numeroFiche?: string): IFicheLien[] {
    return personne.rcas;
  }
};
