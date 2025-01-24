import { ANNEE, JOUR, MOIS, NB_HEURE, NB_MINUTE } from "@composant/formulaire/ConstantesNomsForm";
import DateUtils, { IDateCompose, MEP_YEAR, MIN_LENGTH_ANNEE, MIN_YEAR } from "@util/DateUtils";
import { estHeureValide } from "@util/Utils";
import * as Yup from "yup";
import {
  ANNEE_OBLIGATOIRE,
  DATE_OBLIGATOIRE,
  MIN_LENGTH_ANNEE_MESSAGE,
  MSG_CURRENT_YEAR_MAX,
  MSG_DATE_MEP_MIN,
  MSG_MIN_YEAR
} from "../FormulaireMessages";
export function validateAnnee(value: number, anneeMin?: number, anneeMax?: number, anneeObligatoire = false) {
  let messageErreur;
  if (value) {
    messageErreur = valideBornesAnnee(value, anneeMin, anneeMax);
  } else if (anneeObligatoire === true) {
    messageErreur = ANNEE_OBLIGATOIRE;
  }

  return messageErreur;
}

function valideBornesAnnee(value: number, anneeMin?: number, anneeMax?: number) {
  let messageErreur;
  if (value.toString().length < MIN_LENGTH_ANNEE) {
    messageErreur = MIN_LENGTH_ANNEE_MESSAGE;
  }
  if (anneeMin && value < anneeMin) {
    if (anneeMin === MIN_YEAR) {
      messageErreur = MSG_MIN_YEAR;
    } else if (anneeMin === MEP_YEAR) {
      messageErreur = MSG_DATE_MEP_MIN;
    }
  } else if (anneeMax && anneeMax === new Date().getFullYear() && value > anneeMax) {
    messageErreur = MSG_CURRENT_YEAR_MAX;
  }
  return messageErreur;
}

export const DateValidationSchema = Yup.object()
  .shape({
    [JOUR]: Yup.number(),
    [MOIS]: Yup.number(),
    [ANNEE]: Yup.number()
  })
  .test("formatDateInvalide", function (date: any, error: any) {
    const dateCompose = date as IDateCompose;
    if (!dateCompose) {
      return true;
    }

    if (!dateCompose.jour && !dateCompose.mois && !dateCompose.annee) {
      return true;
    }

    const paramsError = {
      path: `${error.path}.annee`,
      message: "Date ou format invalide (formats autorisés: JJ/MM/AAAA, MM/AAAA, AAAA)"
    };

    return !DateUtils.estDateReceValide(dateCompose) ? this.createError(paramsError) : true;
  })
  .test("heureInvalide", function (value: any, error: any) {
    const nbHeureStr = value[NB_HEURE] as string;
    const nbMinuteStr = value[NB_MINUTE] as string;

    if (!nbHeureStr && !nbMinuteStr) {
      return true;
    }

    // Les minutes vides sont autorisées
    const nbMinute = nbMinuteStr ? Number(nbMinuteStr) : 0;
    if (estHeureValide(Number(nbHeureStr), nbMinute)) {
      return true;
    }

    const paramsError = {
      path: `${error.path}.nbHeure`,
      message: "Heure invalide"
    };

    return this.createError(paramsError);
  })
  .test("heureSaisieEtJourNonSaisi", function (value: any, error: any) {
    const nbHeureStr = value[NB_HEURE] as string;
    const nbMinuteStr = value[NB_MINUTE] as string;
    const jour = value[JOUR] as string;

    if (jour || (!nbHeureStr && !nbMinuteStr)) {
      return true;
    }

    const paramsError = {
      path: `${error.path}.nbHeure`,
      message: "Le jour n'est pas renseigné"
    };
    return this.createError(paramsError);
  });

export const DateValidationSchemaSansTestFormat = Yup.object().shape({
  [JOUR]: Yup.number(),
  [MOIS]: Yup.number(),
  [ANNEE]: Yup.number()
});

export const DateValidationSchemaAnneeObligatoire = Yup.object().shape({
  [JOUR]: Yup.number(),
  [MOIS]: Yup.number(),
  [ANNEE]: Yup.number().required("La saisie de l'année de naissance est obligatoire")
});

export const DateValidationCompleteSchemaSansTestFormatRequired = Yup.object()
  .shape({
    [JOUR]: Yup.number(),
    [MOIS]: Yup.number(),
    [ANNEE]: Yup.number()
  })
  .test("dateCompleteObligatoire", function (date, error) {
    const paramsError = {
      path: `${error.path}.annee`,
      message: DATE_OBLIGATOIRE ?? ""
    };
    return !(date.jour && date.mois && date.annee) ? this.createError(paramsError) : true;
  });
