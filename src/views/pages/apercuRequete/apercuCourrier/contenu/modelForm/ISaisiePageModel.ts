import {
  Adresse,
  Requete
} from "../../../../saisirRequete/modelForm/ISaisirRequetePageModel";

export const CHOIX_COURRIER = "choixCourrier";
export const OPTION = "option";
export const TEXTE_LIBRE = "texteLibre";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";
export const REQUETE = "requete";

export const DELIVRANCE = "delivrance";
export const COURRIER = "courrier";

export const LIBELLE_OPTION = "libelleOption";
export const CONTENU = "contenu";

export const TYPE_MEMO = "typeMemo";
export const MEMO = "memo";
export const TEXTE = "texte";

export const REQUERANT_LIGNE_1 = "requerantLigne1";
export const REQUERANT_LIGNE_2 = "requerantLigne2";

export interface SaisieCourrier {
  [CHOIX_COURRIER]: ChoixCourrier;
  [OPTION]: OptionCourrierForm;
  [TEXTE_LIBRE]: TexteLibre;
  [REQUERANT]: Requerant;
  [ADRESSE]: Adresse;
  [REQUETE]: Requete;
}

export interface ChoixCourrier {
  [DELIVRANCE]: string;
  [COURRIER]: string;
}

export interface OptionCourrierForm {
  [LIBELLE_OPTION]: string;
  [CONTENU]: string;
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
