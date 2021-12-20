import {
  formatJour,
  formatMois,
  IDateCompose
} from "../../../views/common/util/DateUtils";
import {
  formatNom,
  getValeurOuVide,
  jointPrenoms
} from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../../views/common/utilMetier/LieuxUtils";
import { Nationalite } from "../enum/Nationalite";
import { Sexe } from "../enum/Sexe";
import { IPrenom } from "../fiche/IPrenom";

export interface IPartenaire {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: Nationalite;
  sexe: Sexe;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: IPrenom[];
  dateNaissance: IDateCompose;
}

export const Partenaire = {
  getAnneeNaissance(partenaire: IPartenaire): string {
    return getValeurOuVide(partenaire.dateNaissance?.annee);
  },
  getJour(partenaire: IPartenaire): string {
    return formatJour(partenaire.dateNaissance?.jour);
  },
  getPrenoms(partenaire: IPartenaire): string {
    return jointPrenoms(partenaire.prenoms);
  },
  getNomFamille(partenaire: IPartenaire): string {
    return formatNom(partenaire.nomFamille);
  },
  getMoisNaissance(partenaire: IPartenaire): string {
    return formatMois(partenaire.dateNaissance.mois);
  },
  getLieuNaissance(partenaire: IPartenaire): string {
    return LieuxUtils.getLieu(
      partenaire.villeNaissance,
      partenaire.regionNaissance,
      partenaire.paysNaissance,
      partenaire.arrondissementNaissance
    );
  },
  getSexe(partenaire: IPartenaire): string {
    return partenaire.sexe.libelle;
  }
};
