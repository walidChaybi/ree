import { IContratMariageForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { estNonRenseigne } from "@util/Utils";
import * as Yup from "yup";
import { TEXTE } from "../../../../../../../../../common/composant/formulaire/ConstantesNomsForm";

export const ContratMariageValidationSchema = Yup.object().test("contratDeMariage", function (value: any, error: any) {
  const contratMariageForm = value as IContratMariageForm;
  let res: any = true;
  if (contratMariageForm?.existence === "OUI" && estNonRenseigne(contratMariageForm.texte)) {
    const paramsError = {
      path: `${error.path}.${TEXTE}`,
      message: "Le texte du contrat de mariage est obligatoire"
    };
    res = this.createError(paramsError);
  }

  return res;
});
