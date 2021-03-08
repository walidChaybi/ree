import React from "react";
import { Formik, Form } from "formik";
import "./scss/Formulaire.scss";
import { Fieldset } from "../fieldset/Fieldset";

interface FomulaireProps {
  titre: string;
  formDefaultValues: any;
  formValidationSchema: any;
  onSubmit: (values: any) => void;
}

export const Formulaire: React.FC<FomulaireProps> = props => {
  return (
    <div className="Formulaire">
      <Fieldset titre={props.titre}>
        <Formik
          onSubmit={props.onSubmit}
          initialValues={props.formDefaultValues}
          validationSchema={props.formValidationSchema}
        >
          <Form>{props.children}</Form>
        </Formik>
      </Fieldset>
    </div>
  );
};
