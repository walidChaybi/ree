import {
  ADOPTE_PAR,
  AGE,
  ANNEE,
  ARRONDISSEMENT,
  CONTRAT_MARIAGE,
  DATE,
  DATE_EVENEMENT,
  DATE_NAISSANCE_OU_AGE_DE,
  DECLARATION_CONJOINTE,
  DERNIER_CONJOINT,
  DONNEES_COMPLEMENTAIRES_PLURILINGUE,
  ETRANGER_FRANCE,
  EVENEMENT,
  EXISTENCE,
  JOUR,
  LIEU_COMPLET,
  LIEU_EVENEMENT,
  LIEU_NAISSANCE,
  MOIS,
  NB_HEURE,
  NB_MINUTE,
  NOM_APRES_MARIAGE_EPOUSE,
  NOM_APRES_MARIAGE_EPOUX,
  NOM_NAISSANCE,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PARENT_ADOPTANT_NAISS1,
  PARENT_ADOPTANT_NAISS2,
  PARENT_NAISS1,
  PARENT_NAISS2,
  PAYS,
  PRENOMS,
  PRENOM_1,
  PRENOM_2,
  PRENOM_3,
  REGION_DEPARTEMENT,
  SECABLE,
  SEXE,
  TEXTE,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2,
  TYPE,
  VILLE,
  VILLE_EST_AFFICHEE
} from "@composant/formulaire/ConstantesNomsForm";
import { Prenoms } from "./ISaisirRequetePageForm";

export interface ISaisieExtraitForm {
  [EVENEMENT]?: IEvenementForm;
  [DERNIER_CONJOINT]?: IDernierConjointForm;
  [TITULAIRE_EVT_1]: ITitulaireEvtForm;
  [TITULAIRE_EVT_2]?: ITitulaireEvtForm;
  [DONNEES_COMPLEMENTAIRES_PLURILINGUE]?: IDonneesComplementairesPlurilingueForm;
}

export interface IDernierConjointForm {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: string;
}
export interface IEvenementForm {
  [DATE_EVENEMENT]?: IDateCompleteForm;
  [DATE_NAISSANCE_OU_AGE_DE]?: IDateNaissanceAgeDe;
  [LIEU_EVENEMENT]?: ILieuEvenementForm;
  [CONTRAT_MARIAGE]?: IContratMariageForm;
}

export interface IContratMariageForm {
  [EXISTENCE]?: string;
  [TEXTE]?: string;
}

export interface ITitulaireEvtForm {
  [NOM_NAISSANCE]: string;
  [NOM_SECABLE]: INomSecableForm;
  [DECLARATION_CONJOINTE]: IDeclarationConjointeForm;
  [PRENOMS]: Prenoms;
  [SEXE]?: string;
  [EVENEMENT]: IEvenementForm;
  [ADOPTE_PAR]?: string[];
  [PARENT_NAISS1]: IParentNaissanceForm;
  [PARENT_NAISS2]: IParentNaissanceForm;
  [PARENT_ADOPTANT_NAISS1]: IParentNaissanceForm;
  [PARENT_ADOPTANT_NAISS2]: IParentNaissanceForm;
}

export interface INomSecableForm {
  [SECABLE]: string[];
  [NOM_PARTIE1]: string;
  [NOM_PARTIE2]: string;
}

export interface IDeclarationConjointeForm {
  [TYPE]: string;
  [DATE]: IDateJourMoisAnneForm;
}

export interface IDateCompleteForm {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
  [NB_HEURE]?: string;
  [NB_MINUTE]?: string;
}

export interface IDateJourMoisAnneForm {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
}

export interface IPrenomsForm {
  [PRENOM_1]: string;
  [PRENOM_2]: string;
  [PRENOM_3]: string;
}

export interface ILieuEvenementForm {
  [LIEU_COMPLET]: string;
  [VILLE]: string;
  [ARRONDISSEMENT]: string;
  [REGION_DEPARTEMENT]: string;
  [PAYS]: string;
  [ETRANGER_FRANCE]: string;
  [VILLE_EST_AFFICHEE]?: boolean;
}

export interface IParentNaissanceForm {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: Prenoms;
  [SEXE]?: string;
  [DATE_NAISSANCE_OU_AGE_DE]: IDateNaissanceAgeDe;
  [LIEU_NAISSANCE]: ILieuEvenementForm;
}

export interface IDateNaissanceAgeDe {
  [AGE]: string;
  [DATE]: IDateJourMoisAnneForm;
}

export interface IDonneesComplementairesPlurilingueForm {
  [NOM_APRES_MARIAGE_EPOUX]?: string;
  [NOM_APRES_MARIAGE_EPOUSE]?: string;
}
