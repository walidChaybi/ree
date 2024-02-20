import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";

export interface IMiseAJourMentionsForm {
  [LISTES_TYPES_MENTION]: {
    [MENTION_NIVEAU_UN]: string;
    [MENTION_NIVEAU_DEUX]: string;
    [MENTION_NIVEAU_TROIS]: string;
  };
  [TEXTE_MENTION]: string;
}
