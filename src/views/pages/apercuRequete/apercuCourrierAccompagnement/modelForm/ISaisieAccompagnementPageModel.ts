export const EN_TETE = "enTete";
export const OPTIONS = "options";
export const TEXTE_LIBRE = "texteLibre";
export const REQUERANT = "requerant";
export const REQUETE = "requete";

export const DELIVRANCE = "delivrance";
export const COURRIER = "courrier";

export const NOM = "nom";
export const CONTENU = "contenu";
export const AJOUTE = "ajoute";

export const TYPE_MEMO = "typeMemo";
export const MEMO = "memo";
export const TEXTE = "texte";

export const REQUERANT_LIGNE_1 = "requerantLigne1";
export const REQUERANT_LIGNE_2 = "requerantLigne2";

export const ADRESSE_LIGNE_2 = "adresseLigne2";
export const ADRESSE_LIGNE_3 = "adresseLigne3";
export const ADRESSE_LIGNE_4 = "adresseLigne4";
export const ADRESSE_LIGNE_5 = "adresseLigne5";
export const ADRESSE_CODEPOSTAL = "adresseCodePostal";
export const ADRESSE_VILLE = "adresseVille";
export const ADRESSE_PAYS = "adressePays";

export const MOTIF = "motif";
export const COMPLEMENT = "complement";
export const NB_EXEMPLAIRE = "nbExemplaire";

export interface SaisieAccompagnement {
  [EN_TETE]: EnTete;
  [OPTIONS]: Option[];
  [TEXTE_LIBRE]: TexteLibre;
  [REQUERANT]: Requerant;
  [REQUETE]: Requete;
}

export interface EnTete {
  [DELIVRANCE]: string;
  [COURRIER]: string;
}

export interface Option {
  [NOM]: string;
  [CONTENU]: string;
  [AJOUTE]: boolean;
}

export interface TexteLibre {
  [TYPE_MEMO]: string;
  [MEMO]: string;
  [TEXTE]: string;
}

export interface Requerant {
  [REQUERANT_LIGNE_1]: string;
  [REQUERANT_LIGNE_2]: string;
  [ADRESSE_LIGNE_2]: string;
  [ADRESSE_LIGNE_3]: string;
  [ADRESSE_LIGNE_4]: string;
  [ADRESSE_LIGNE_5]: string;
  [ADRESSE_CODEPOSTAL]: string;
  [ADRESSE_VILLE]: string;
  [ADRESSE_PAYS]: string;
}

export interface Requete {
  [MOTIF]: string;
  [COMPLEMENT]: string;
  [NB_EXEMPLAIRE]: string;
}
