import React from "react";
import { Formik, Form } from "formik";
import "./scss/Formulaire.scss";

interface FomulaireProps {
  titre: string;
  blocs: JSX.Element[];
  formDefaultValues: any;
  formValidationSchema: any;
  onSubmit: (values: any) => void;
  libelleBouton: string;
  formulaireClassName?: string;
}

export const Formulaire: React.FC<FomulaireProps> = props => {
  return (
    <div className="Formulaire">
      <div className="Titre">
        <span>{props.titre}</span>
      </div>
      <Formik
        onSubmit={props.onSubmit}
        initialValues={props.formDefaultValues}
        validationSchema={props.formValidationSchema}
      >
        {({ isValid, dirty }) => (
          <>
            {props.blocs && (
              <Form>
                <div className={props.formulaireClassName}>
                  {props.blocs.map(bloc => {
                    return bloc;
                  })}
                </div>
                {
                  <button disabled={!isValid || !dirty} type="submit">
                    {props.libelleBouton}
                  </button>
                }
              </Form>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};
