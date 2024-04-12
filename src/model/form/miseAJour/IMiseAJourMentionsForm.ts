import {
  ANALYSE_MARGINALE,
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  MOTIF,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PRENOMS,
  SECABLE,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { Prenoms } from "../delivrance/ISaisirRequetePageForm";

export interface IMiseAJourMentionsForm {
  [LISTES_TYPES_MENTION]: {
    [MENTION_NIVEAU_UN]: string;
    [MENTION_NIVEAU_DEUX]: string;
    [MENTION_NIVEAU_TROIS]: string;
  };
  [TEXTE_MENTION]: string;
}

export interface IMajAnalyseMarginaleForm {
  [ANALYSE_MARGINALE]: IMajPrenomsAnalyseMarginaleForm;
  [NOM_SECABLE]: IMajNomSecableAnalyseMarginaleForm;
}

export interface IMajPrenomsAnalyseMarginaleForm {
  [NOM]: string;
  [PRENOMS]: Prenoms;
  [MOTIF]: string;
}

export interface IMajNomSecableAnalyseMarginaleForm {
  [SECABLE]: boolean;
  [NOM_PARTIE1]: string;
  [NOM_PARTIE2]: string;
}