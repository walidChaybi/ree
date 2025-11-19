import { DATE_EVENEMENT, DATE_NAISSANCE_OU_AGE_DE } from "@views/common/composant/formulaire/ConstantesNomsForm";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import * as Yup from "yup";
import { DateNaissanceOuAgeDeValidationSchema } from "./DateNaissanceOuAgeDeFormValidation";
export const EvenementValidationSchema = Yup.object({
  [DATE_EVENEMENT]: DateValidationSchema
});

export const EvenementActeMariageValidationSchema = Yup.object({
  [DATE_NAISSANCE_OU_AGE_DE]: DateNaissanceOuAgeDeValidationSchema
});
