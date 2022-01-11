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
  return (
    <div className={className ? `${className} Formulaire` : "Formulaire"}>
      <Fieldset titre={titre}>
        <Formik
          onSubmit={onSubmit}
          initialValues={formDefaultValues}
          validationSchema={formValidationSchema}
          enableReinitialize={true}
          disabled={disabled}
        >
          <Form>{children}</Form>
        </Formik>
      </Fieldset>
    </div>
  );
};
