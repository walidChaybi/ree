import { getLibelle } from "../views/common/widget/Text";
import { MIN_YEAR } from "../views/common/util/DateUtils";

export const MSG_MIN_YEAR = getLibelle(
  `L'année doit être supérieure ou égale à ${MIN_YEAR}`
);

export const MSG_MEP_YEAR = getLibelle(
  `L'année doit être supérieure ou égale au 1er janvier 2021`
);
