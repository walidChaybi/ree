import {
  formatNom,
  formatPrenom,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../LieuxUtils";
import {
  IDateCompose,
  getDateStringFromDateCompose
} from "../../../views/common/util/DateUtils";
import { Sexe } from "../enum/Sexe";
import { AutresNoms } from "../enum/AutresNoms";
import { ILieuEvenement } from "./ILieuEvenement";
import { IFicheLien } from "./IFicheLien";
import { IFicheLienActes } from "./IFicheLienActes";
import { IFamille } from "./IFamille";
import { IAutresNoms } from "./IAutresNoms";

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

export const Personne = {
  getNom(personne: IPersonne): string {
    return personne.nom ? formatNom(personne.nom) : "";
  },

  getAutresNoms(personne: IPersonne): string {
    return personne.autresNoms
      ? personne.autresNoms
          .map(nom => {
            const typeNom = ` (${nom.type.libelle})`;
            return `${formatNom(nom.nom)}${
              AutresNoms.isAutre(nom.type) ? "" : typeNom
            }`;
          })
          .join(", ")
      : "";
  },

  getPrenoms(personne: IPersonne): string {
    return personne.prenoms
      ? personne.prenoms.map(prenom => formatPrenom(prenom)).join(", ")
      : "";
  },

  getAutresPrenom(personne: IPersonne): string {
    return personne.autresPrenoms
      ? personne.autresPrenoms
          .map(autrePrenom => formatPrenom(autrePrenom))
          .join(", ")
      : "";
  },

  getLieuNaissance(personne: IPersonne): string {
    return personne.lieuNaissance
      ? LieuxUtils.getLieu(
          personne.lieuNaissance.ville,
          personne.lieuNaissance.region,
          personne.lieuNaissance.pays,
          personne.lieuNaissance.arrondissement
        )
      : "";
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
    return personne.dateNaissance
      ? getDateStringFromDateCompose(personne.dateNaissance)
      : "";
  },

  getDateDeces(personne: IPersonne): string {
    return personne.dateDeces
      ? getDateStringFromDateCompose(personne.dateDeces)
      : "";
  },

  getNationalite(personne: IPersonne): string {
    return personne.nationalite
      ? premiereLettreEnMajusculeLeResteEnMinuscule(personne.nationalite)
      : "";
  },

  getSexe(personne: IPersonne): string {
    return personne.sexe?.libelle;
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
