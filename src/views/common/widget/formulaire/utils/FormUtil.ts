import { TRequete } from "@model/requete/IRequete";
import { Options } from "@util/Type";
import { FormikProps, FormikValues } from "formik";

export const NB_CARACT_MAX_SAISIE = "100";
export const NB_CARACT_ADRESSE = "38";
export const NB_CARACT_COMMUNE = "32";
export const TRENTE_DEUX_CARACT_MAX = "32";
export const CENT_CARACT_MAX = "100";
export const DIX_CARACT_MAX = "10";
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
