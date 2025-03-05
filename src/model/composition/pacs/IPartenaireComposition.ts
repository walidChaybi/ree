import DateUtils from "@util/DateUtils";
import { Partenaire } from "../../etatcivil/pacs/Partenaire";

export interface IPartenaire1Composition {
  prenoms_partenaire_1: string;
  nom_partenaire_1: string;
  jour_naissance_partenaire_1: string;
  mois_naissance_partenaire_1: string;
  annee_naissance_partenaire_1: string;
  lieu_naissance_partenaire_1: string;
  sexe_partenaire_1: string;
}

export interface IPartenaire2Composition {
  prenoms_partenaire_2: string;
  nom_partenaire_2: string;
  jour_naissance_partenaire_2: string;
  mois_naissance_partenaire_2: string;
  annee_naissance_partenaire_2: string;
  lieu_naissance_partenaire_2: string;
  sexe_partenaire_2: string;
}

export const PartenaireComposition = {
  ajoutInfosPartenaire1(obj: IPartenaire1Composition, partenaire?: Partenaire) {
    if (partenaire) {
      obj.prenoms_partenaire_1 = partenaire.prenoms;
      obj.nom_partenaire_1 = partenaire.nomFamille;
      obj.jour_naissance_partenaire_1 = DateUtils.formatJour(partenaire.dateNaissance.jour);
      obj.mois_naissance_partenaire_1 = DateUtils.formatMois(partenaire.dateNaissance.mois);
      obj.annee_naissance_partenaire_1 = partenaire.dateNaissance.annee;
      obj.lieu_naissance_partenaire_1 = partenaire.getLieuNaissance();
      obj.sexe_partenaire_1 = partenaire.sexe.libelle.toLowerCase();
    }
  },

  ajoutInfosPartenaire2(obj: IPartenaire2Composition, partenaire?: Partenaire) {
    if (partenaire) {
      obj.prenoms_partenaire_2 = partenaire.prenoms;
      obj.nom_partenaire_2 = partenaire.nomFamille;
      obj.jour_naissance_partenaire_2 = DateUtils.formatJour(partenaire.dateNaissance.jour);
      obj.mois_naissance_partenaire_2 = DateUtils.formatMois(partenaire.dateNaissance.mois);
      obj.annee_naissance_partenaire_2 = partenaire.dateNaissance.annee;
      obj.lieu_naissance_partenaire_2 = partenaire.getLieuNaissance();
      obj.sexe_partenaire_2 = partenaire.sexe.libelle.toLowerCase();
    }
  }
};
