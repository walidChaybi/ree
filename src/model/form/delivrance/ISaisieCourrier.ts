import {
  ADRESSE,
  CHOIX_COURRIER,
  CONTENU,
  COURRIER,
  DELIVRANCE,
  LIBELLE_OPTION,
  MEMO,
  OPTION,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE,
  TEXTE,
  TEXTE_LIBRE,
  TYPE_MEMO
} from "@composant/formulaire/ConstantesNomsForm";
import {
  Adresse,
  Requete
} from "@pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";

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
  [TYPE_MEMO]?: string;
  [MEMO]?: string;
  [TEXTE]: string;
}

export interface Requerant {
  [REQUERANT_LIGNE_1]: string;
  [REQUERANT_LIGNE_2]: string;
}
