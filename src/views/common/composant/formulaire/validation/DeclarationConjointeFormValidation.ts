import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import * as Yup from "yup";
import { DATE } from "../ConstantesNomsForm";
export const DeclarationConjointeValidationSchema = Yup.object({
  [DATE]: DateValidationSchema
});
