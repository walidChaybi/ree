import DateUtils, { IDateCompose } from "@util/DateUtils";
import { getValeurOuVide } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { AutresNoms } from "../enum/AutresNoms";
import { Nationalite } from "../enum/Nationalite";
import { Sexe } from "../enum/Sexe";
import { IAutresNoms } from "./IAutresNoms";
import { IFamille } from "./IFamille";
import { IFicheLien } from "./IFicheLien";
import { IFicheLienActes } from "./IFicheLienActes";
import { ILieuEvenement } from "./ILieuEvenement";

export interface IPersonne {
  id: string;
  nom: string;
  autresNoms: IAutresNoms[];
  prenoms: string[];
  autresPrenoms: string[];
  lieuNaissance: ILieuEvenement;
  dateNaissance: IDateCompose;
  nationalite: Nationalite;
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
    return personne.nom ?? "";
  },

  getAutresNoms(personne: IPersonne): string {
    return personne.autresNoms
      ? personne.autresNoms
          .map(nom => {
            const typeNom = ` (${nom.type.libelle})`;
            return `${nom.nom}${AutresNoms.isAutre(nom.type) ? "" : typeNom}`;
          })
          .join(", ")
      : "";
  },

  getPrenoms(personne: IPersonne): string {
    return personne.prenoms ? personne.prenoms.join(", ") : "";
  },

  getAutresPrenom(personne: IPersonne): string {
    return personne.autresPrenoms ? personne.autresPrenoms.join(", ") : "";
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
      ? LieuxUtils.getLieu(personne.lieuDeces.ville, personne.lieuDeces.region, personne.lieuDeces.pays, personne.lieuDeces.arrondissement)
      : "";
  },

  getDateNaissance(personne: IPersonne): string {
    return personne.dateNaissance ? DateUtils.getDateStringFromDateCompose(personne.dateNaissance) : "";
  },

  getDateDeces(personne: IPersonne): string {
    return personne.dateDeces ? DateUtils.getDateStringFromDateCompose(personne.dateDeces) : "";
  },

  getNationalite(personne: IPersonne): string {
    return getValeurOuVide(personne.nationalite?.libelle);
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
