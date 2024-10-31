import { Sexe } from "@model/etatcivil/enum/Sexe";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { TRequete } from "@model/requete/IRequete";
import { Options } from "@util/Type";
import { FormikProps, FormikValues } from "formik";
import { ISaisieParentSousForm } from "./../../../../../model/form/creation/etablissement/ISaisiePostulantForm";
import { traiteEspace } from "./ControlesUtil";

export const NB_CARACT_MAX_SAISIE = "100";
export const NB_CARACT_ADRESSE = "38";
export const NB_CARACT_COMMUNE = "32";
export const TRENTE_DEUX_CARACT_MAX = "32";
export const DEUX_CENT_CARACT_MAX = "200";
export const CENT_CARACT_MAX = "100";
export const DIX_CARACT_MAX = "10";
// TOREFACTO Pas la bonne valeur ?
export const TRENTE_HUIT_CARACT_MAX = "100";
export const IGNORER_TABULATION = -1;

export type FormikComponentProps = {
  formik: FormikProps<FormikValues>;
};

export interface IOnFieldChangeParam {
  filtreDirty?: boolean;
}

export interface ComponentFiltreProps {
  nomFiltre: string;
  filtreInactif?: boolean;
  onFieldChange?: (param: IOnFieldChangeParam) => void;
}

export interface ISubForm {
  nom: string;
  options?: Options;
  titre?: string;
  reset?: boolean;
  onChange?: (value: string) => void;
  requete?: TRequete;
  formulaireReduit?: boolean;
  disabled?: boolean;
  visible?: boolean;
}

// Pour le typage des "connect" formik
export interface INomForm {
  nom: string;
  disabled?: boolean;
}

export type SubFormProps = ISubForm & FormikComponentProps;

export function withNamespace(nomParent: string, nomChamp: string) {
  return nomParent ? `${nomParent}.${nomChamp}` : nomChamp;
}

export function reinitialiserChamps(prefixChamp: string, suffixChamps: string[], formik: FormikProps<FormikValues>): void {
  for (const suffixChamp of suffixChamps) {
    formik.setFieldValue(withNamespace(prefixChamp, suffixChamp), "");
  }
}

export function getLibelleParentFromSexe(numeroOrdre: number, saisie?: ISaisieParentSousForm) {
  const sexeEnum = Sexe.getEnumFor(saisie?.sexe ?? "");
  switch (sexeEnum) {
    case Sexe.FEMININ:
      return "Mère";
    case Sexe.MASCULIN:
      return "Père";
    default:
      return `Parent ${numeroOrdre}`;
  }
}

export const onBlurChampNumero = (
  e: React.ChangeEvent<HTMLInputElement>,
  formik: FormikProps<FormikValues>
): void => {
  traiteEspace(e, formik.handleChange);
  formik.handleBlur(e);
};

export function compteNombreDePrenoms(prenoms?: Prenoms): number {
  return Object.values(prenoms || {}).reduce(
    (resultat: number, prenom: string) =>
      prenom === "" ? resultat : resultat + 1,
    0
  );
}

export function compteNombreDeChampsPrenoms(prenoms: Prenoms): number {
  return Object.values(prenoms).filter(
    prenom => prenom === "" || Boolean(prenom)
  ).length;
}

export const getValeurFormik = (
  formik: FormikProps<FormikValues>,
  champ: string
) => {
  return formik.getFieldProps(champ).value;
};