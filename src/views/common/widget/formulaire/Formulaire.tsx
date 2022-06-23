import { Form, Formik } from "formik";
import React from "react";
import { Fieldset } from "../fieldset/Fieldset";
import "./scss/Formulaire.scss";

interface FomulaireProps {
  titre?: string;
  formDefaultValues: any;
  formValidationSchema: any;
  onSubmit: (values: any, errors?: any) => void;
  className?: string;
  disabled?: boolean;
}

export const Formulaire: React.FC<FomulaireProps> = ({
  children,
  titre = "",
  formDefaultValues,
  formValidationSchema,
  onSubmit,
  className,
  disabled
}) => {
  const form = getForm(
    onSubmit,
    formDefaultValues,
    formValidationSchema,
    disabled,
    children
  );
  return (
    <div className={className ? `${className} Formulaire` : "Formulaire"}>
      {titre ? <Fieldset titre={titre}>{form}</Fieldset> : form}
    </div>
  );
};
function getForm(
  onSubmit: (values: any, errors?: any) => void,
  formDefaultValues: any,
  formValidationSchema: any,
  disabled = false,
  children: any
) {
  return (
    <Formik
      onSubmit={(e: any) => {
        onSubmit(e);
      }}
      initialValues={formDefaultValues}
      validationSchema={formValidationSchema}
      enableReinitialize={true}
      disabled={disabled}
    >
      <Form>{children}</Form>
    </Formik>
  );
}
