import {
  enMajuscule,
  premiereLettreEnMajuscule,
  rempliAGaucheAvecZero,
  supprimerEspacesInutiles
} from "@util/Utils";
import { FormikProps, FormikValues } from "formik";

export const NB_MAX_JOUR = 31;
export const NB_MAX_MOIS = 12;

export const digitSeulementRegExp = new RegExp("^\\d*$");
export function digitSeulement(str: string) {
  return str ? digitSeulementRegExp.test(str) : true;
}

export function traiteCarAutorises(element: any, filter: any) {
  if (filter(String(element.value))) {
    element.oldValue = element.value;
    element.oldSelectionStart = element.selectionStart;
    element.oldSelectionEnd = element.selectionEnd;
  } else if (Object.prototype.hasOwnProperty.call(element, "oldValue")) {
    element.value = element.oldValue;
    if (
      element.oldSelectionStart !== null &&
      element.oldSelectionEnd !== null
    ) {
      element.setSelectionRange(
        element.oldSelectionStart,
        element.oldSelectionEnd
      );
    }
  } else {
    element.value = "";
  }
}

export function traiteDepassement(element: any, nb: number) {
  if (Number(element.value) > nb) {
    element.value = String(nb);
  }
}

export function traiteDepassementJour(element: any) {
  traiteDepassement(element, NB_MAX_JOUR);
}

export function traiteDepassementMois(element: any) {
  traiteDepassement(element, NB_MAX_MOIS);
}

export function focusApresProchainChamps(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (e.target.value.length >= Number(e.target.getAttribute("maxlength"))) {
    const nextElemInput = e.target.nextElementSibling
      ?.nextElementSibling as HTMLInputElement;
    nextElemInput.focus();
  }
}

export function traiteZeroAGauche(e: any, formik: FormikProps<FormikValues>) {
  e.target.value = rempliAGaucheAvecZero(e.target.value);
  formik.handleChange(e);
  formik.handleBlur(e);
}

export function traiteEspace(e: any, fct: any) {
  e.target.value = supprimerEspacesInutiles(e.target.value);
  fct(e);
}

export function sortieChampEnMajuscule(
  e: any,
  formik: FormikProps<FormikValues>,
  nomChamp: string
) {
  e.target.value = enMajuscule(supprimerEspacesInutiles(e.target.value));
  formik.setFieldValue(nomChamp, e.target.value);
  formik.handleBlur(e);
}

export function sortieChampPremiereLettreEnMajuscule(
  e: any,
  formik: FormikProps<FormikValues>,
  nomChamp: string
) {
  e.target.value = premiereLettreEnMajuscule(
    supprimerEspacesInutiles(e.target.value)
  );
  formik.setFieldValue(nomChamp, e.target.value);
  formik.handleBlur(e);
}

export function sortieChampSupprimerEspacesInutiles(
  e: any,
  formik: FormikProps<FormikValues>,
  nomChamp: string
) {
  e.target.value = supprimerEspacesInutiles(e.target.value);
  formik.setFieldValue(nomChamp, e.target.value);
  formik.handleBlur(e);
}
