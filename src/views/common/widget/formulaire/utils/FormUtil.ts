import { FormikProps, FormikValues } from "formik";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { Options } from "../../../util/Type";

export const NB_CARACT_MAX_SAISIE = "100";
export const NB_CARACT_ADRESSE = "38";
export const NB_CARACT_COMMUNE = "32";
export const NB_CARACT_CODE_POSTAL = "5";

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
  options: Options;
  titre?: string;
  reset?: boolean;
  onChange?: (value: string) => void;
  requete?: TRequete;
  formulaireReduit?: boolean;
  disabled?: boolean;
}

export type SubFormProps = ISubForm & FormikComponentProps;

export function withNamespace(nomParent: string, nomChamp: string) {
  return nomParent ? `${nomParent}.${nomChamp}` : nomChamp;
}
