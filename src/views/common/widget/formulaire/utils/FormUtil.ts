import { FormikProps, FormikValues, getIn, FormikErrors } from "formik";

export type FormikComponentProps = {
  formik: FormikProps<FormikValues>;
};

export interface ComponentFiltreProps {
  nomFiltre: string;
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
