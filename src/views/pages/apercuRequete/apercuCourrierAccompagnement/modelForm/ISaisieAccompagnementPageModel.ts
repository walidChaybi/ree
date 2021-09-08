import {
  Adresse,
  Requete
} from "../../../saisirRequete/modelForm/ISaisirRequetePageModel";

export const EN_TETE = "enTete";
export const OPTIONS = "options";
export const TEXTE_LIBRE = "texteLibre";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";
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

export interface SaisieAccompagnement {
  [EN_TETE]: EnTete;
  [OPTIONS]: Option[];
  [TEXTE_LIBRE]: TexteLibre;
  [REQUERANT]: Requerant;
  [ADRESSE]: Adresse;
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
}
