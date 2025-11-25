import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import React from "react";
import { Fieldset } from "../fieldset/Fieldset";
import "./scss/Formulaire.scss";

interface IFormulaireProps<T> {
  titre?: string;
  formDefaultValues: any;
  formValidationSchema: any;
  // TODO: Supprimer l'optionnel pour formikHelpers
  onSubmit: (values: T & FormikValues, formikHelpers?: FormikHelpers<T & FormikValues>) => void;
  className?: string;
  disabled?: boolean;
  refFormulaire?: React.MutableRefObject<FormikProps<T & FormikValues> | null>;
}

export const Formulaire = <T,>({
  children,
  titre = "",
  formDefaultValues,
  formValidationSchema,
  onSubmit,
  className,
  refFormulaire
}: React.PropsWithChildren<IFormulaireProps<T>>) => {
  const form = getForm(onSubmit, formDefaultValues, formValidationSchema, children, className, refFormulaire);
  return (
    <div className={className ? `${className} Formulaire` : "Formulaire"}>{titre ? <Fieldset titre={titre}>{form}</Fieldset> : form}</div>
  );
};
const getForm = <T extends unknown>(
  onSubmit: (values: T & FormikValues, formikHelpers?: FormikHelpers<T & FormikValues>) => void,
  formDefaultValues: any,
  formValidationSchema: any,
  children: any,
  className?: string,
  refFormulaire?: React.MutableRefObject<FormikProps<T & FormikValues> | null>
) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={formDefaultValues}
      validationSchema={formValidationSchema}
      enableReinitialize={true}
      innerRef={form => {
        if (refFormulaire) {
          refFormulaire.current = form;
        }
      }}
    >
      <Form className={className}>{children}</Form>
    </Formik>
  );
};
