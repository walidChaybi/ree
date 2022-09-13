import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import * as Yup from "yup";
import { DATE } from "../ConstantesNomsForm";

export const DateNaissanceOuAgeDeValidationSchema = Yup.object({
  [DATE]: DateValidationSchema
});
