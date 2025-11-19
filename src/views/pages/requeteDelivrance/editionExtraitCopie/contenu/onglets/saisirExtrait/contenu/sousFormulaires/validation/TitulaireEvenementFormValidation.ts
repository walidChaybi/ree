import { ITitulaireEvtForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { estNonRenseigne, estRenseigne } from "@util/Utils";
import { CARACTERES_AUTORISES_MESSAGE, CHAMP_OBLIGATOIRE } from "@widget/formulaire/FormulaireMessages";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../../../../../ressources/Regex";
import {
  DECLARATION_CONJOINTE,
  EVENEMENT,
  NOM_NAISSANCE,
  NOM_SECABLE,
  PARENT_ADOPTANT_NAISS1,
  PARENT_ADOPTANT_NAISS2,
  PARENT_NAISS1,
  PARENT_NAISS2,
  PRENOMS,
  SEXE
} from "../../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import { creerValidationSchemaPrenom } from "../../../../../../../../../common/composant/formulaire/nomsPrenoms/PrenomsForm";
import { DeclarationConjointeValidationSchema } from "../../../../../../../../../common/composant/formulaire/validation/DeclarationConjointeFormValidation";
import {
  EvenementActeMariageValidationSchema,
  EvenementValidationSchema
} from "../../../../../../../../../common/composant/formulaire/validation/EvenementValidationSchema";
import { NomSecableFormValidation } from "../../../../../../../../../common/composant/formulaire/validation/NomSecableFormValidation";
import { sexeObligatoireValidation } from "../../../../../../../../../common/composant/formulaire/validation/SexeObligatoireValidation";
import {
  ParentNaissSansDateAgeDeValidationSchema,
  ParentNaissSansSexeDateAgeDeValidationSchema,
  ParentNaissValidationSchema
} from "./ParentNaissValidationSchema";

const validationComplete = {
  [NOM_NAISSANCE]: Yup.string().required(CHAMP_OBLIGATOIRE).matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string().required(),
  [EVENEMENT]: EvenementValidationSchema,
  [PARENT_NAISS1]: ParentNaissValidationSchema,
  [PARENT_NAISS2]: ParentNaissValidationSchema
};

// ActeNaissance
export const TitulaireEvtActeNaissanceValidationSchema = Yup.object({
  ...validationComplete,
  [NOM_SECABLE]: NomSecableFormValidation,
  [DECLARATION_CONJOINTE]: DeclarationConjointeValidationSchema
}).test("sexeObligatoire", function (value: any, error: any) {
  return sexeObligatoireValidation(this, value, error);
});

// Acte Mariage
const validationSansSexeDateAgeDePourLesParents = {
  ...validationComplete,
  [NOM_SECABLE]: NomSecableFormValidation,
  [EVENEMENT]: EvenementActeMariageValidationSchema,
  [PARENT_NAISS1]: ParentNaissSansSexeDateAgeDeValidationSchema,
  [PARENT_NAISS2]: ParentNaissSansSexeDateAgeDeValidationSchema,
  [PARENT_ADOPTANT_NAISS1]: ParentNaissSansSexeDateAgeDeValidationSchema,
  [PARENT_ADOPTANT_NAISS2]: ParentNaissSansSexeDateAgeDeValidationSchema
};

export const TitulaireEvtActeMariageValidationSchema = Yup.object(validationSansSexeDateAgeDePourLesParents)
  .test("sexeObligatoire", function (value: any, error: any) {
    return sexeObligatoireValidation(this, value, error);
  })
  .test("nomParent1Obligatoire", function (value: any, error: any) {
    let res: any = true;
    const titulaireEvtForm = value as ITitulaireEvtForm;

    if (estRenseigne(titulaireEvtForm.parentNaiss2?.nomNaissance) && estNonRenseigne(titulaireEvtForm.parentNaiss1?.nomNaissance)) {
      const paramsError = {
        path: `${error.path}.${PARENT_NAISS1}.${NOM_NAISSANCE}`,
        message: "Le nom de naissance est obligatoire (parent 2 renseigné)"
      };
      res = this.createError(paramsError);
    } else if (
      estRenseigne(titulaireEvtForm.parentAdoptantNaiss2?.nomNaissance) &&
      estNonRenseigne(titulaireEvtForm.parentAdoptantNaiss1?.nomNaissance)
    ) {
      const paramsError = {
        path: `${error.path}.${PARENT_ADOPTANT_NAISS1}.${NOM_NAISSANCE}`,
        message: "Le nom de naissance est obligatoire (parent adoptant 2 renseigné)"
      };
      res = this.createError(paramsError);
    }

    return res;
  });

// Acte Déces
const validationSansDateAgeDePourLesParents = {
  ...validationComplete,
  [PARENT_NAISS1]: ParentNaissSansDateAgeDeValidationSchema,
  [PARENT_NAISS2]: ParentNaissSansDateAgeDeValidationSchema
};
export const TitulaireEvtActeDecesValidationSchema = Yup.object(validationSansDateAgeDePourLesParents).test(
  "sexeObligatoire",
  function (value: any, error: any) {
    return sexeObligatoireValidation(this, value, error);
  }
);
