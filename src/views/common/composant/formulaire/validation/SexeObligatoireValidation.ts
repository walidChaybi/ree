import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { getLibelle } from "../../../util/Utils";
import { SEXE } from "../ConstantesNomsForm";

export const sexeObligatoireValidation = function (
  context: any,
  value: any,
  error: any
) {
  let res: any = true;
  if (
    value &&
    (!value[SEXE] || Sexe.getEnumFor(value[SEXE]) === Sexe.INCONNU)
  ) {
    const paramsError = {
      path: `${error.path}.${SEXE}`,
      message: getLibelle("Le sexe est obligatoire")
    };
    res = context.createError(paramsError);
  }

  return res;
};
