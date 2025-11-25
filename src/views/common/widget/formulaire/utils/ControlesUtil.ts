import { premiereLettreEnMajuscule, rempliAGaucheAvecZero, supprimerEspacesInutiles } from "@util/Utils";
import { FormikProps, FormikValues } from "formik";

const NB_MAX_JOUR = 31;
const NB_MAX_MOIS = 12;

const digitSeulementRegExp = new RegExp("^\\d*$");
export const digitSeulement = (str: string) => {
  return str ? digitSeulementRegExp.test(str) : true;
};

export const traiteCarAutorises = (element: any, filter: any) => {
  if (filter(String(element.value))) {
    element.oldValue = element.value;
    element.oldSelectionStart = element.selectionStart;
    element.oldSelectionEnd = element.selectionEnd;
  } else if (Object.prototype.hasOwnProperty.call(element, "oldValue")) {
    element.value = element.oldValue;
    if (element.oldSelectionStart !== null && element.oldSelectionEnd !== null) {
      element.setSelectionRange(element.oldSelectionStart, element.oldSelectionEnd);
    }
  } else {
    element.value = "";
  }
};

const traiteDepassement = (element: any, nb: number) => {
  if (Number(element.value) > nb) {
    element.value = String(nb);
  }
};

export const traiteDepassementJour = (element: any) => {
  traiteDepassement(element, NB_MAX_JOUR);
};

export const traiteDepassementMois = (element: any) => {
  traiteDepassement(element, NB_MAX_MOIS);
};

export const focusApresProchainChamps = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length >= Number(e.target.getAttribute("maxlength"))) {
    const nextElemInput = e.target.nextElementSibling?.nextElementSibling as HTMLInputElement;
    nextElemInput.focus();
  }
};

export const traiteZeroAGauche = (e: any, formik: FormikProps<FormikValues>) => {
  e.target.value = rempliAGaucheAvecZero(e.target.value);
  formik.handleChange(e);
  formik.handleBlur(e);
};

export const traiteEspace = (e: any, fct: any) => {
  e.target.value = supprimerEspacesInutiles(e.target.value);
  fct(e);
};

export const sortieChampEnMajuscule = (e: any, formik: FormikProps<FormikValues>, nomChamp: string) => {
  e.target.value = supprimerEspacesInutiles(e.target.value).toLocaleUpperCase();
  formik.setFieldValue(nomChamp, e.target.value);
  formik.handleBlur(e);
};

export const sortieChampPremiereLettreEnMajuscule = (e: any, formik: FormikProps<FormikValues>, nomChamp: string) => {
  e.target.value = premiereLettreEnMajuscule(supprimerEspacesInutiles(e.target.value));
  formik.setFieldValue(nomChamp, e.target.value);
  formik.handleBlur(e);
};

export const sortieChampSupprimerEspacesInutiles = (e: any, formik: FormikProps<FormikValues>, nomChamp: string) => {
  e.target.value = supprimerEspacesInutiles(e.target.value);
  formik.setFieldValue(nomChamp, e.target.value);
  formik.handleBlur(e);
};
