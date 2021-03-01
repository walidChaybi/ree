import { FormikProps, FormikValues, getIn, FormikErrors } from "formik";

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

export function withNamespace(nomParent: string, nomChamp: string) {
  return nomParent ? `${nomParent}.${nomChamp}` : nomChamp;
}

export function isErrorString(
  errors: FormikErrors<FormikValues>,
  path: string
) {
  const error = getIn(errors, path);
  return error && typeof error === "string";
}

export function getFieldValue(formikValues: FormikValues, fieldPath: string) {
  return getIn(formikValues, fieldPath);
}

export function isDirty(
  value: any,
  name: string,
  formikValues: FormikValues,
  paths: string[]
): boolean {
  const values = paths.map(path =>
    name === path ? value : getFieldValue(formikValues, path)
  );
  return values.some(v => v);
}
