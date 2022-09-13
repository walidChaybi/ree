import {
  DECLARATION_CONJOINTE,
  NOM_NAISSANCE,
  PARENT_NAISS1,
  PARENT_NAISS2,
  PRENOMS,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import { DeclarationConjointeValidationSchema } from "@composant/formulaire/validation/DeclarationConjointeFormValidation";
import { sexeObligatoireValidation } from "@composant/formulaire/validation/SexeObligatoireValidation";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import {
  CARATERES_AUTORISES_MESSAGE,
  CHAMP_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../../../../../ressources/Regex";
import { DATE_EVENEMENT } from "../../../../../../../saisirRequete/modelForm/ISaisirRequetePageModel";
import { PrenomsFormValidationSchema } from "../../../../../../../saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import { ParentNaissValidationSchema } from "./ParentNaissValidationSchema";

export const TitulaireEvtValidationSchema = Yup.object({
  [NOM_NAISSANCE]: Yup.string()
    .required(CHAMP_OBLIGATOIRE)
    .matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [DECLARATION_CONJOINTE]: DeclarationConjointeValidationSchema,
  [PRENOMS]: PrenomsFormValidationSchema,
  [SEXE]: Yup.string().required(),
  [DATE_EVENEMENT]: DateValidationSchema,
  [PARENT_NAISS1]: ParentNaissValidationSchema,
  [PARENT_NAISS2]: ParentNaissValidationSchema
}).test("sexeObligatoire", function (value: any, error: any) {
  return sexeObligatoireValidation(this, value, error);
});
