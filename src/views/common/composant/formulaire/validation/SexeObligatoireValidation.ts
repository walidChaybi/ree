import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IParentNaissanceForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/mapping/mappingActeVerFormulaireSaisirExtrait";
import { getLibelle } from "@util/Utils";
import { SEXE } from "../ConstantesNomsForm";

export const sexeObligatoireValidation = function (
  context: any,
  value: IParentNaissanceForm,
  error: any
) {
  let res: any = true;
  if (
    value &&
    value.nomNaissance &&
    (!value.sexe || Sexe.getEnumFor(value.sexe) === Sexe.INCONNU)
  ) {
    const paramsError = {
      path: `${error.path}.${SEXE}`,
      message: getLibelle("Le sexe est obligatoire")
    };
    res = context.createError(paramsError);
  }

  return res;
};
