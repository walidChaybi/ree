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
        {({ isValid, dirty, resetForm }) => (
          <>
            {props.blocs && (
              <Form>
                <div className={props.formulaireClassName}>
                  {props.blocs.map(bloc => {
                    return bloc;
                  })}
                </div>
                {
                  <div className="Buttons">
                    <button
                      className="ResetButton"
                      type="reset"
                      onClick={() => resetForm()}
                    >
                      Réinitialiser les critères
                    </button>
                    <button disabled={!isValid || !dirty} type="submit">
                      {props.libelleBouton}
                    </button>
                  </div>
                }
              </Form>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};
