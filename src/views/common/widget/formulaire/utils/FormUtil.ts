import { FormikProps, FormikValues } from "formik";

export type FormikComponentProps = {
  formik: FormikProps<FormikValues>;
};

export function withNamespace(nomParent: string, nomChamp: string) {
  return nomParent ? `${nomParent}.${nomChamp}` : nomChamp;
}
