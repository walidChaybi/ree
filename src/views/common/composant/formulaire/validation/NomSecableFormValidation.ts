import { INomSecableForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/mapping/mappingActeVerFormulaireSaisirExtrait";
import { estNonRenseigne, estRenseigne, getLibelle } from "@util/Utils";
import * as Yup from "yup";
import { NOM_PARTIE1, NOM_PARTIE2 } from "../ConstantesNomsForm";

export const NomSecableFotmValidation = Yup.object().test(
  "noms1ereEt2emePartieObligatoire",
  function (value: any, error: any) {
    return noms1ereEt2emePartieValidation(this, value, error);
  }
);

const noms1ereEt2emePartieValidation = function (
  context: any,
  value: INomSecableForm,
  error: any
) {
  let res: any = true;
  if (estRenseigne(value?.nomPartie1) && estNonRenseigne(value?.nomPartie2)) {
    const paramsError = {
      path: `${error.path}.${NOM_PARTIE2}`,
      message: getLibelle("La 2nde partie est obligatoire")
    };
    res = context.createError(paramsError);
  } else if (
    estNonRenseigne(value?.nomPartie1) &&
    estRenseigne(value?.nomPartie2)
  ) {
    const paramsError = {
      path: `${error.path}.${NOM_PARTIE1}`,
      message: getLibelle("La 1re partie est obligatoire")
    };
    res = context.createError(paramsError);
  }

  return res;
};
