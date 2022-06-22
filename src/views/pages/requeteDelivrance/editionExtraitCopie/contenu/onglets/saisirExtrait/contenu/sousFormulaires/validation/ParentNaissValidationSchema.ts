import * as Yup from "yup";
import {
  DATE_NAISSANCE_OU_AGE_DE,
  NOM_NAISSANCE,
  SEXE
} from "../../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import { DateNaissanceOuAgeDeValidationSchema } from "../../../../../../../../../common/composant/formulaire/validation/DateNaissanceOuAgeDeFormValidation";
import { sexeObligatoireValidation } from "../../../../../../../../../common/composant/formulaire/validation/SexeObligatoireValidation";
import {
  auMoinsUneProprieteEstRenseigne,
  estNonRenseigne,
  getLibelle
} from "../../../../../../../../../common/util/Utils";
import { IParentNaissanceForm } from "../../../mapping/mappingActeVerFormulaireSaisirExtrait";
export const ParentNaissValidationSchema = Yup.object({
  [DATE_NAISSANCE_OU_AGE_DE]: DateNaissanceOuAgeDeValidationSchema,
  [SEXE]: Yup.string().required()
})
  .test("sexeObligatoireParent", function (value: any, error: any) {
    return sexeObligatoireValidation(this, value, error);
  })
  .test("nomParentObligatoire", function (value: any, error: any) {
    let res: any = true;
    const parentNaissanceForm: IParentNaissanceForm = value;
    if (
      parentNaissanceForm &&
      estNonRenseigne(parentNaissanceForm.nomNaissance) &&
      auMoinsUneProprieteEstRenseigne(parentNaissanceForm)
    ) {
      const paramsError = {
        path: `${error.path}.${NOM_NAISSANCE}`,
        message: getLibelle("Le nom de naissance est obligatoire")
      };
      res = this.createError(paramsError);
    }

    return res;
  });
