import { INomSecableForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { estNonRenseigne, estRenseigne, getLibelle } from "@util/Utils";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { NOM_PARTIE1, NOM_PARTIE2 } from "../ConstantesNomsForm";

const PARTIE_1_OBLIGATOIRE = "La 1re partie est obligatoire";
const PARTIE_2_OBLIGATOIRE = "La 2nde partie est obligatoire";

export const NomSecableFormValidation = Yup.object().test(
  "noms1ereEt2emePartieObligatoire",
  function (value: any, error: any) {
    return noms1ereEt2emePartieValidation(this, value, error);
  }
);

export const NomSecableStrictFormValidation = Yup.object().test(
  "noms1ereEt2emePartieStrictObligatoire",
  function (value: any, error: any) {
    return noms1ereEt2emePartieStrictValidation(this, value, error);
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
      message: getLibelle(PARTIE_2_OBLIGATOIRE)
    };
    res = context.createError(paramsError);
  } else if (
    estNonRenseigne(value?.nomPartie1) &&
    estRenseigne(value?.nomPartie2)
  ) {
    const paramsError = {
      path: `${error.path}.${NOM_PARTIE1}`,
      message: getLibelle(PARTIE_1_OBLIGATOIRE)
    };
    res = context.createError(paramsError);
  }

  return res;
};

const noms1ereEt2emePartieStrictValidation = function (
  context: any,
  value: INomSecableForm,
  error: any
) {
  let res: any = true;
  const errors = [];
  if (value.secable[0] === "true") {
    if (estNonRenseigne(value?.nomPartie1)) {
      errors.push(
        new ValidationError(
          PARTIE_1_OBLIGATOIRE,
          null,
          `${error.path}.${NOM_PARTIE1}`
        )
      );
    }
    if (estNonRenseigne(value?.nomPartie2)) {
      errors.push(
        new ValidationError(
          PARTIE_2_OBLIGATOIRE,
          null,
          `${error.path}.${NOM_PARTIE2}`
        )
      );
    }
    if (errors.length > 0) {
      res = new ValidationError(errors);
    }
  }

  return res;
};