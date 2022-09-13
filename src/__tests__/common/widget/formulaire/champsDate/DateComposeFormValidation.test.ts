import { MEP_YEAR, MIN_YEAR } from "@util/DateUtils";
import { validateAnnee } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import {
  ANNEE_OBLIGATOIRE,
  MIN_LENGTH_ANNEE_MESSAGE,
  MSG_CURRENT_YEAR_MAX,
  MSG_DATE_MEP_MIN,
  MSG_MIN_YEAR
} from "@widget/formulaire/FormulaireMessages";

test("Attendu: validateAnnee fonctionne correctement", () => {
  expect(validateAnnee(0, undefined, undefined, true)).toBe(ANNEE_OBLIGATOIRE);
  expect(validateAnnee(100, undefined, undefined, true)).toBe(
    MIN_LENGTH_ANNEE_MESSAGE
  );

  expect(validateAnnee(1000, MIN_YEAR, undefined, true)).toBe(MSG_MIN_YEAR);

  expect(validateAnnee(1000, MEP_YEAR, undefined, true)).toBe(MSG_DATE_MEP_MIN);

  expect(validateAnnee(3000, undefined, new Date().getFullYear(), true)).toBe(
    MSG_CURRENT_YEAR_MAX
  );
});
