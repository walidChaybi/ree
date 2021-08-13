import { Form, Formik } from "formik";
import React from "react";
import { Fieldset } from "../fieldset/Fieldset";
import "./scss/Formulaire.scss";

interface FomulaireProps {
  titre: string;
  formDefaultValues: any;
  formValidationSchema: any;
  onSubmit: (values: any, errors?: any) => void;
  className?: string;
}

export const Formulaire: React.FC<FomulaireProps> = props => {
  return (
    <div
      className={
        props.className ? `${props.className} Formulaire` : "Formulaire"
      }
    >
      <Fieldset titre={props.titre}>
        <Formik
          onSubmit={props.onSubmit}
          initialValues={props.formDefaultValues}
          validationSchema={props.formValidationSchema}
          enableReinitialize={true}
        >
          <Form>{props.children}</Form>
        </Formik>
      </Fieldset>
    </div>
  );
};
