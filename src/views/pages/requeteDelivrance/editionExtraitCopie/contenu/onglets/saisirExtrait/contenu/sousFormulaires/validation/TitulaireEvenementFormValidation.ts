import {
  DECLARATION_CONJOINTE,
  EVENEMENT,
  NOM_NAISSANCE,
  PARENT_NAISS1,
  PARENT_NAISS2,
  PRENOMS,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import { DeclarationConjointeValidationSchema } from "@composant/formulaire/validation/DeclarationConjointeFormValidation";
import { EvenementValidationSchema } from "@composant/formulaire/validation/EvenementValidationSchema";
import { sexeObligatoireValidation } from "@composant/formulaire/validation/SexeObligatoireValidation";
import {
  CARATERES_AUTORISES_MESSAGE,
  CHAMP_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../../../../../ressources/Regex";
import { PrenomsFormValidationSchema } from "../../../../../../../saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import {
  ParentNaissSansDateAgeDeValidationSchema,
  ParentNaissSansSexeDateAgeDeValidationSchema,
  ParentNaissValidationSchema
} from "./ParentNaissValidationSchema";

const validationComplete = {
  [NOM_NAISSANCE]: Yup.string()
    .required(CHAMP_OBLIGATOIRE)
    .matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [DECLARATION_CONJOINTE]: DeclarationConjointeValidationSchema,
  [PRENOMS]: PrenomsFormValidationSchema,
  [SEXE]: Yup.string().required(),
  [EVENEMENT]: EvenementValidationSchema,
  [PARENT_NAISS1]: ParentNaissValidationSchema,
  [PARENT_NAISS2]: ParentNaissValidationSchema
};

const validationSansSexeDateAgeDePourLesParents = {
  ...validationComplete,
  [PARENT_NAISS1]: ParentNaissSansSexeDateAgeDeValidationSchema,
  [PARENT_NAISS2]: ParentNaissSansSexeDateAgeDeValidationSchema
};

const validationSansDateAgeDePourLesParents = {
  ...validationComplete,
  [PARENT_NAISS1]: ParentNaissSansDateAgeDeValidationSchema,
  [PARENT_NAISS2]: ParentNaissSansDateAgeDeValidationSchema
};

export const TitulaireEvtValidationSchema = Yup.object(validationComplete).test(
  "sexeObligatoire",
  function (value: any, error: any) {
    return sexeObligatoireValidation(this, value, error);
  }
);

export const TitulaireEvtSansSexeDateAgeDePourLesParentsValidationSchema =
  Yup.object(validationSansSexeDateAgeDePourLesParents).test(
    "sexeObligatoire",
    function (value: any, error: any) {
      return sexeObligatoireValidation(this, value, error);
    }
  );

export const TitulaireEvtSansDateAgeDePourLesParentsValidationSchema =
  Yup.object(validationSansDateAgeDePourLesParents).test(
    "sexeObligatoire",
    function (value: any, error: any) {
      return sexeObligatoireValidation(this, value, error);
    }
  );



