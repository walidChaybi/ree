import {
  ADRESSE,
  CHOIX_COURRIER,
  CONTENU,
  COURRIER,
  DELIVRANCE,
  LIBELLE_OPTION,
  MEMO,
  NOM,
  OPTION,
  PRENOM,
  RAISON_SOCIALE,
  REQUERANT,
  REQUETE,
  TEXTE,
  TEXTE_LIBRE,
  TYPE_MEMO
} from "../../../views/common/composant/formulaire/ConstantesNomsForm";
import { ISaisieAdresse, Requete } from "./ISaisirRequetePageForm";

export interface SaisieCourrier {
  [CHOIX_COURRIER]: ChoixCourrier;
  [OPTION]: OptionCourrierForm;
  [TEXTE_LIBRE]: TexteLibre;
  [REQUERANT]: RequerantCourrier;
  [ADRESSE]: ISaisieAdresse;
  [REQUETE]: Requete;
}

interface ChoixCourrier {
  [DELIVRANCE]: string;
  [COURRIER]: string;
}

interface OptionCourrierForm {
  [LIBELLE_OPTION]: string;
  [CONTENU]: string;
}

interface TexteLibre {
  [TYPE_MEMO]?: string;
  [MEMO]?: string;
  [TEXTE]: string;
}

interface RequerantCourrier {
  [RAISON_SOCIALE]: string;
  [NOM]: string;
  [PRENOM]: string;
}
