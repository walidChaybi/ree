import {
  ADRESSE,
  ADRESSE_COURRIEL,
  ANNEE,
  ARRONDISSEMENT_NAISSANCE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  DATE_MARIAGE,
  DATE_NAISSANCE,
  DATE_RECONNAISSANCE,
  DEPARTEMENT_NAISSANCE,
  DEPARTEMENT_RECONNAISSANCE,
  IDENTIFIANT,
  JOUR,
  LIEN_REQUERANT,
  LIEU_ACTE_RECONNAISSANCE,
  LIEU_DE_MARIAGE,
  LIEU_DE_NAISSANCE,
  LIEU_DIT,
  MARIAGE,
  MOIS,
  NAISSANCE,
  NATIONALITES,
  NATIONALITE_1,
  NATIONALITE_2,
  NATIONALITE_3,
  NATURE_ACTE,
  NOM,
  NOMS,
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  NOM_USAGE,
  NUMERO_TELEPHONE,
  PARENTS,
  PARENTS_MARIES,
  PAS_DE_NOM_ACTE_ETRANGER,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU,
  PAYS,
  PAYS_DU_MARIAGE,
  PAYS_NAISSANCE,
  PAYS_ORIGINE,
  PAYS_RECONNAISSANCE,
  PAYS_STATUT_REFUGIE,
  PIECES_JOINTES,
  PRENOM,
  PRENOMS,
  RECONNAISSANCE,
  REGION_ETAT_RECONNAISSANCE,
  REGION_NAISSANCE,
  REGISTRE,
  REQUERANT,
  REQUETE,
  SEXE,
  TITULAIRE,
  TITULAIRE_RECONNU,
  VILLE_DE_MARIAGE,
  VILLE_NAISSANCE,
  VILLE_RECONNAISSANCE,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { PieceJointe } from "@util/FileUtils";
import { Option } from "@util/Type";

export interface ISaisieRequeteRCTC {
  [REQUETE]: IRequeteForm;
  [TITULAIRE]: IIdentiteTitulaireForm;
  [PARENTS]: {
    parent1: IParentForm;
    parent2: IParentForm;
    [MARIAGE]: IEvenementMariageParentsForm;
    [RECONNAISSANCE]: IEvenementReconnaissanceTitulaireForm;
  };
  [REQUERANT]: IRequerantForm;
  [PIECES_JOINTES]?: PieceJointe[];
}

export interface IRequeteForm {
  [NATURE_ACTE]: string;
  [LIEN_REQUERANT]: string;
  [REGISTRE]: Option;
}

export interface IIdentiteTitulaireForm {
  [IDENTIFIANT]: string;
  [NOMS]: INomsForm;
  [PAS_DE_PRENOM_CONNU]: string | string[];
  [PRENOMS]: IPrenomsForm;
  [SEXE]: string;
  [DATE_NAISSANCE]: IDateForm;
  [NAISSANCE]: IEvenementNaissanceCommunForm;
}

export type IEvenementNaissanceCommunForm = Omit<
  IEvenementNaissanceForm,
  "lieuNaissance" | "departementNaissance"
>;

export interface INomsForm {
  [PAS_DE_NOM_ACTE_ETRANGER]: string | string[];
  [NOM_ACTE_ETRANGER]: string;
  [NOM_SOUHAITE_ACTE_FR]: string;
}
export interface IPrenomsForm {
  [key: string]: string;
}

export interface IDateForm {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
}

// TODO Renommer IEvenementNaissanceForm
export interface IEvenementNaissanceForm {
  [VILLE_NAISSANCE]: string;
  [REGION_NAISSANCE]: string;
  [PAYS_NAISSANCE]: string;
  [ARRONDISSEMENT_NAISSANCE]: string;
  [LIEU_DE_NAISSANCE]: string;
  [DEPARTEMENT_NAISSANCE]: string;
}

export interface IParentForm {
  [IDENTIFIANT]: string;
  [NOM]: string;
  [PRENOMS]: IPrenomsForm;
  [PAS_DE_NOM_CONNU]: string | string[];
  [PAS_DE_PRENOM_CONNU]: string | string[];
  [SEXE]: string;
  [DATE_NAISSANCE]: IDateForm;
  [NAISSANCE]: IEvenementNaissanceForm;
  [NATIONALITES]: INationalitesForm;
  [PAYS_STATUT_REFUGIE]: string;
  [PAYS_ORIGINE]: string;
}

export interface INationalitesForm {
  [NATIONALITE_1]: string;
  [NATIONALITE_2]: string;
  [NATIONALITE_3]: string;
}

export interface IEvenementMariageParentsForm {
  [IDENTIFIANT]: string;
  [PARENTS_MARIES]: string;
  [DATE_MARIAGE]: IDateForm;
  [LIEU_DE_MARIAGE]: string;
  [VILLE_DE_MARIAGE]: string;
  [PAYS_DU_MARIAGE]: string;
}

export interface IEvenementReconnaissanceTitulaireForm {
  [IDENTIFIANT]: string;
  [TITULAIRE_RECONNU]: string;
  [DATE_RECONNAISSANCE]: IDateForm;
  [LIEU_ACTE_RECONNAISSANCE]: string;
  [VILLE_RECONNAISSANCE]: string;
  [REGION_ETAT_RECONNAISSANCE]: string;
  [DEPARTEMENT_RECONNAISSANCE]: string;
  [PAYS_RECONNAISSANCE]: string;
}

export interface IRequerantForm {
  [NOM]: string;
  [NOM_USAGE]: string;
  [PRENOM]: string;
  [AUTRE_ADRESSE_COURRIEL]: string;
  [AUTRE_NUMERO_TELEPHONE]: string;
  [ADRESSE]: IAdresseForm;
}

export interface IAdresseForm {
  [VOIE]: string;
  [LIEU_DIT]: string;
  [COMPLEMENT_DESTINATAIRE]: string;
  [COMPLEMENT_POINT_GEO]: string;
  [CODE_POSTAL]: string;
  [COMMUNE]: string;
  [PAYS]: string;
  [ADRESSE_COURRIEL]: string;
  [NUMERO_TELEPHONE]: string;
}
