import * as Yup from "yup";
import { DateValidationSchema } from "../../../widget/formulaire/champsDate/DateComposeFormValidation";
import { DATE } from "../ConstantesNomsForm";
export const DeclarationConjointeValidationSchema = Yup.object({
  [DATE]: DateValidationSchema
});
