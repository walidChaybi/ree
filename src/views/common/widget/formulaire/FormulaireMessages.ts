import { MIN_YEAR } from "@util/DateUtils";
import { getLibelle } from "@util/Utils";

// Messages d'erreurs
export const CARACTERES_AUTORISES_MESSAGE =
  "Les caractères autorisés : les lettres, les chiffres, l'espace, le tiret, le point et l'apostrophe";

export const ASTERISQUE_MESSAGE =
  "Il faut 2 caractères minimum avant l'astérisque";

export const NUMERO_INSCRIPTION_MESSAGE =
  "Le n° de l'inscription doit respecter le format année-numéro";

export const CARACTERES_ALPHANUMERIQUE =
  "Les caractères autorisés sont les chiffres et les lettres sans accents";

export const ADRESSE_MAIL_NON_CONFORME =
  "L'adresse courriel saisie est non conforme";

export const NUMERO_TELEPHONE_NON_CONFORME =
  "Le numéro de téléphone saisi est non conforme";

export const DOCUMENT_OBLIGATOIRE = "Le choix d'un document est obligatoire";

export const NATURE_ACTE_OBLIGATOIRE = getLibelle(
  "La nature d'acte est obligatoire"
);

export const DOCUMENT_DEMANDE_OBLIGATOIRE = getLibelle(
  "Le document demandé est obligatoire"
);

export const NB_EXEMPLAIRE_OBLIGATOIRE = getLibelle(
  "Le nombre d'exemplaire est obligatoire"
);

export const NB_EXEMPLAIRE_MINIMUM = getLibelle(
  "Le nombre minimum d'exemplaires est de 1"
);
export const NB_EXEMPLAIRE_MAXIMUM = getLibelle(
  "Le nombre maximum d'exemplaires est de 5"
);

export const ALERTE_OBLIGATOIRE = getLibelle(
  "Le choix d'un motif est obligatoire"
);
export const MOTIF_OBLIGATOIRE = getLibelle(
  "Le motif de délivrance est obligatoire"
);
export const ALERTE_AUTRE = getLibelle(
  `L'observation est obligatoire si le motif est "Autre"`
);
export const COMPLEMENT_DESCRIPTION_LIMITE_TAILLE = getLibelle(
  `L'observation ne peut pas dépasser 150 caractères`
);

export const MIN_LENGTH_ANNEE_MESSAGE = getLibelle(
  "L'année doit être sur 4 chiffres"
);
export const MAX_ANNEE_MESSAGE =
  "L'année ne peut pas être postérieur à l'année courante";
export const MSG_MIN_YEAR = getLibelle(
  `L'année doit être supérieure ou égale à ${MIN_YEAR}`
);
export const MSG_DATE_MEP_MIN = getLibelle(
  `La date doit être supérieure ou égale au 1er janvier 2021`
);
export const MSG_CURRENT_YEAR_MAX = getLibelle(
  `L'année doit être inférieure ou égale à l'année en cours`
);
export const ANNEE_OBLIGATOIRE = getLibelle("L'année est obligatoire");

export const DATE_OBLIGATOIRE = getLibelle(
  "La saisie de la date complète est obligatoire"
);

export const DEFINITION_SEXE_OBLIGATOIRE = getLibelle(
  'Le sexe doit être renseigné à "Masculin" ou "Féminin"'
);

export const CHAMP_OBLIGATOIRE = getLibelle("Ce champ est obligatoire");

export const LIEN_REQUERANT_OBLIGATOIRE = getLibelle(
  "Le lien requérant est obligatoire"
);

export const REGISTRE_OBLIGATOIRE = getLibelle(
  "La ville du registre est obligatoire"
);