import {
  ADOPTE_PAR,
  ADRESSE,
  AGE,
  ANALYSE_MARGINALE,
  ANNEE,
  ARRONDISSEMENT,
  ARRONDISSEMENT_NAISSANCE,
  AUTRES,
  AUTRE_DECLARANT,
  DATE,
  DATE_NAISSANCE,
  DECLARANT,
  DEPARTEMENT,
  DEPARTEMENT_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  FRANCISATION_POSTULANT,
  IDENTITE,
  JOUR,
  LIEU_DE_NAISSANCE,
  MOIS,
  NATURE_ACTE,
  NE_DANS_MARIAGE,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PARENT1,
  PARENT2,
  PARENTS,
  PAYS,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  PROJET,
  RECONNAISSANCE,
  REGION_NAISSANCE,
  SECABLE,
  SEXE,
  TITULAIRE,
  TYPE,
  VILLE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { PAS_DE_PRENOM_CONNU } from "../../../../views/common/composant/formulaire/ConstantesNomsForm";

export interface ISaisieProjetPostulantForm {
  [PROJET]: ISaisieProjetSousForm;
  [TITULAIRE]: ISaisiePostulantSousForm;
  [FRANCISATION_POSTULANT]: ISaisieFrancisationPostulantSousForm;
  [PARENTS]: ISaisieParentsPostulant;
  [AUTRES]: ISaisieAutresSousForm;
}

export interface ISaisieProjetSousForm {
  [TYPE]: string;
  [NATURE_ACTE]: string;
}

export interface ISaisiePostulantSousForm {
  [NOM]: string;
  [NOM_SECABLE]: ISaisieNomSecable;
  [PRENOMS]: ISaisiePrenoms;
  [ANALYSE_MARGINALE]: ISaisieAnalyseMarginale;
  [IDENTITE]: string;
  [SEXE]: string;
  [DATE_NAISSANCE]: ISaisieDateNaissance;
  [LIEU_DE_NAISSANCE]: ISaisieLieuNaissance;
  [ADOPTE_PAR]: unknown[];
}

export interface ISaisieFrancisationPostulantSousForm {
  [NOM]?: string;
  [PRENOMS]?: string;
}

export interface ISaisieAutresSousForm {
  [ADRESSE]: string;
  [VILLE]: string;
  [ARRONDISSEMENT]: string;
  [DEPARTEMENT]: string;
  [PAYS]: string;
  [RECONNAISSANCE]: string;
  [DECLARANT]: string;
  [AUTRE_DECLARANT]?: string;
}

export interface ISaisieNomSecable {
  [SECABLE]: string | string[];
  [NOM_PARTIE1]: string;
  [NOM_PARTIE2]: string;
}

export interface ISaisiePrenoms {
  [PAS_DE_PRENOM_CONNU]: string | string[];
  [PRENOMS]: Prenoms;
}

export interface ISaisieAnalyseMarginale {
  [NOM]: string;
  [PRENOMS]: Prenoms;
}

export interface ISaisieDateNaissance {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
}

export interface ISaisieDateNaissanceOuAgeDe {
  [DATE]: ISaisieDateNaissance;
  [AGE]: string;
}

export interface ISaisieLieuNaissance {
  [VILLE_NAISSANCE]: string;
  [ETAT_CANTON_PROVINCE]: string;
  [PAYS_NAISSANCE]: string;
  [NE_DANS_MARIAGE]: string;
}

export interface ISaisieLieuNaissanceParent {
  [LIEU_DE_NAISSANCE]: string;
  [VILLE_NAISSANCE]: string;
  [REGION_NAISSANCE]: string;
  [DEPARTEMENT_NAISSANCE]: string;
  [ARRONDISSEMENT_NAISSANCE]: string;
  [PAYS_NAISSANCE]: string;
}

interface ISaisieParentsPostulant {
  [PARENT1]?: ISaisieParentSousForm;
  [PARENT2]?: ISaisieParentSousForm;
}

export interface ISaisieParentSousForm {
  [NOM]: string;
  [PRENOM]: ISaisiePrenoms;
  [SEXE]: string;
  [DATE_NAISSANCE]: ISaisieDateNaissanceOuAgeDe;
  [LIEU_DE_NAISSANCE]: ISaisieLieuNaissanceParent;
}
