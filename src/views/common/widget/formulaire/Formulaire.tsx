import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { Fieldset } from "../fieldset/Fieldset";
import "./scss/Formulaire.scss";

interface IFormulaireProps<T extends any> {
  titre?: string;
  formDefaultValues: any;
  formValidationSchema: any;
  // TODO: Supprimer l'optionnel pour formikHelpers
  onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void;
  className?: string;
  disabled?: boolean;
}

export const Formulaire = <T,>({
  children,
  titre = "",
  formDefaultValues,
  formValidationSchema,
  onSubmit,
  className,
  disabled
}: React.PropsWithChildren<IFormulaireProps<T>>) => {
  const form = getForm(
    onSubmit,
    formDefaultValues,
    formValidationSchema,
    disabled,
    children,
    className
  );
  return (
    <div className={className ? `${className} Formulaire` : "Formulaire"}>
      {titre ? <Fieldset titre={titre}>{form}</Fieldset> : form}
    </div>
  );
};
function getForm<T>(
  onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void,
  formDefaultValues: any,
  formValidationSchema: any,
  disabled = false,
  children: any,
  className?: string
) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={formDefaultValues}
      validationSchema={formValidationSchema}
      enableReinitialize={true}
      disabled={disabled}
    >
      <Form className={className}>{children}</Form>
    </Formik>
  );
}
