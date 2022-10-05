import { DATE_EVENEMENT } from "@composant/formulaire/ConstantesNomsForm";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import * as Yup from "yup";
export const EvenementValidationSchema = Yup.object({
  [DATE_EVENEMENT]: DateValidationSchema
});
