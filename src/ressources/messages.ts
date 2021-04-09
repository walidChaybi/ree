import { getLibelle } from "../views/common/widget/Text";
import { MIN_YEAR } from "../views/common/util/DateUtils";

export const MSG_MIN_YEAR = getLibelle(
  `L'année doit être supérieure ou égale à ${MIN_YEAR}`
);

export const MSG_DATE_MEP_MIN = getLibelle(
  `La date doit être supérieure ou égale au 1er janvier 2021`
);

export const MSG_CURRENT_YEAR_MAX = getLibelle(
  `L'année doit être inférieure ou égale à l'année en cours`
);

export const MSG_MIN_LENGTH_ANNEE = getLibelle(
  `L'année doit être sur 4 chiffres`
);
