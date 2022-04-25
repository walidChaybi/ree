import * as Yup from "yup";
import {
  DATE_NAISSANCE_OU_AGE_DE,
  SEXE
} from "../../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import { DateNaissanceOuAgeDeValidationSchema } from "../../../../../../../../../common/composant/formulaire/DateNaissanceOuAgeDeForm";
import { sexeObligatoireValidation } from "../../../../../../../../../common/composant/formulaire/validation/SexeObligatoireValidation";
export const ParentNaissValidationSchema = Yup.object({
  [DATE_NAISSANCE_OU_AGE_DE]: DateNaissanceOuAgeDeValidationSchema,
  [SEXE]: Yup.string().required()
}).test("sexeObligatoireParent", function (value: any, error: any) {
  return sexeObligatoireValidation(this, value, error);
});
