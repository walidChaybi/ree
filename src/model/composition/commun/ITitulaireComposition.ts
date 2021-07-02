import {
  getJourOu1er,
  getMoisNaissanceEnLettre
} from "../../../views/common/util/DateUtils";
import {
  getValeurOuVide,
  jointAvecEspace
} from "../../../views/common/util/Utils";
import { ITitulaireRequeteTableau } from "../../requete/v2/IRequeteTableau";

export interface ITitulaireComposition {
  prenoms: string;
  nom: string;
  jour_naissance?: string;
  mois_naissance?: string;
  annee_naissance: string;
  ville_naissance: string;
  pays_naissance: string;
  sexe: string;
}

export const TitulaireComposition = {
  ajoutInfosTitulaire(
    obj: ITitulaireComposition,
    titulaire?: ITitulaireRequeteTableau
  ) {
    if (titulaire) {
      obj.nom = getValeurOuVide(titulaire.nom);
      obj.prenoms = getValeurOuVide(jointAvecEspace(titulaire.prenoms));
      obj.sexe = titulaire.sexe.libelle;

      obj.jour_naissance = getJourOu1er(titulaire.jourNaissance);
      obj.mois_naissance = getMoisNaissanceEnLettre(titulaire.moisNaissance);
      obj.annee_naissance = String(getValeurOuVide(titulaire.anneeNaissance));
      obj.ville_naissance = getValeurOuVide(titulaire.villeNaissance);
      obj.pays_naissance = getValeurOuVide(titulaire.paysNaissance);
    }
  }
};
