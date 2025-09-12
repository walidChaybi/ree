import { MIN_YEAR } from "@util/DateUtils";

// Messages d'erreurs
export const CARACTERES_AUTORISES_MESSAGE =
  "Les caractères autorisés : les lettres, les chiffres, l'espace, le tiret, le point et l'apostrophe";

export const CARACTERES_AUTORISES_AVEC_VIRGULE_MESSAGE =
  "Les caractères autorisés : les lettres, les chiffres, l'espace, la virgule, le tiret, le point et l'apostrophe";

export const ASTERISQUE_MESSAGE = "Il faut 2 caractères minimum avant l'astérisque";

export const CARACTERES_ALPHANUMERIQUE = "Les caractères autorisés sont les chiffres et les lettres sans accents";

export const ADRESSE_MAIL_NON_CONFORME = "L'adresse courriel saisie est non conforme";

export const NUMERO_TELEPHONE_NON_CONFORME = "Le numéro de téléphone saisi est non conforme";

export const DOCUMENT_OBLIGATOIRE = "Le choix d'un document est obligatoire";

export const NATURE_ACTE_OBLIGATOIRE = "La nature d'acte est obligatoire";

export const ALERTE_OBLIGATOIRE = "Le choix d'un motif est obligatoire";
export const ALERTE_AUTRE = `L'observation est obligatoire si le motif est "Autre"`;
export const COMPLEMENT_DESCRIPTION_LIMITE_TAILLE = `L'observation ne peut pas dépasser 150 caractères`;

export const MIN_LENGTH_ANNEE_MESSAGE = "L'année doit être sur 4 chiffres";
export const MSG_MIN_YEAR = `L'année doit être supérieure ou égale à ${MIN_YEAR}`;
export const MSG_DATE_MEP_MIN = `La date doit être supérieure ou égale au 1er janvier 2021`;
export const MSG_CURRENT_YEAR_MAX = `L'année doit être inférieure ou égale à l'année en cours`;
export const ANNEE_OBLIGATOIRE = "L'année est obligatoire";

export const DATE_OBLIGATOIRE = "La saisie de la date complète est obligatoire";

export const DEFINITION_SEXE_OBLIGATOIRE = 'Le sexe doit être renseigné à "Masculin" ou "Féminin"';

export const DEPARTEMENT_OBLIGATOIRE = "La saisie du département est obligatoire";

export const CHAMP_OBLIGATOIRE = "Ce champ est obligatoire";
