import { IPartenaire, Partenaire } from "../../etatcivil/pacs/IPartenaire";

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
  ajoutInfosPartenaire1(
    obj: IPartenaire1Composition,
    partenaire?: IPartenaire
  ) {
    if (partenaire) {
      obj.prenoms_partenaire_1 = Partenaire.getPrenoms(partenaire);
      obj.nom_partenaire_1 = Partenaire.getNomFamille(partenaire);
      obj.jour_naissance_partenaire_1 = Partenaire.getJourNaissance(partenaire);
      obj.mois_naissance_partenaire_1 = Partenaire.getMoisNaissance(partenaire);
      obj.annee_naissance_partenaire_1 = Partenaire.getAnneeNaissance(
        partenaire
      );
      obj.lieu_naissance_partenaire_1 = Partenaire.getLieuNaissance(partenaire);
      obj.sexe_partenaire_1 = Partenaire.getSexe(partenaire).toLowerCase();
    }
  },

  ajoutInfosPartenaire2(
    obj: IPartenaire2Composition,
    partenaire?: IPartenaire
  ) {
    if (partenaire) {
      obj.prenoms_partenaire_2 = Partenaire.getPrenoms(partenaire);
      obj.nom_partenaire_2 = Partenaire.getNomFamille(partenaire);
      obj.jour_naissance_partenaire_2 = Partenaire.getJourNaissance(partenaire);
      obj.mois_naissance_partenaire_2 = Partenaire.getMoisNaissance(partenaire);
      obj.annee_naissance_partenaire_2 = Partenaire.getAnneeNaissance(
        partenaire
      );
      obj.lieu_naissance_partenaire_2 = Partenaire.getLieuNaissance(partenaire);
      obj.sexe_partenaire_2 = Partenaire.getSexe(partenaire).toLowerCase();
    }
  }
};
