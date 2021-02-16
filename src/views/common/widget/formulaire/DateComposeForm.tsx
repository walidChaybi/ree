import React from "react";
import { Field, ErrorMessage, connect } from "formik";
import * as Yup from "yup";
import "./scss/DateComposeForm.scss";
import ReceDatePicker, {
  ReceDatePickerProps
} from "./DatePicker/ReceDatePicker";
import {
  traiteDepassementJour,
  traiteDepassementMois,
  digitSeulement,
  focusApresProchainChamps,
  traiteCarAutorises,
  traiteZeroAGauche
} from "./utils/ControlesUtil";
import { withNamespace, FormikComponentProps } from "./utils/FormUtil";

// Noms des champs
export const JOUR = "jour";
export const MOIS = "mois";
export const ANNEE = "annee";

// Valeurs par défaut des champs
export const DateDefaultValues = {
  [JOUR]: "",
  [MOIS]: "",
  [ANNEE]: ""
};

// Schéma de validation des champs
export const DateValidationSchema = Yup.object({
  [JOUR]: Yup.number().typeError("Veuillez saisir un jour"),
  [MOIS]: Yup.number(),
  [ANNEE]: Yup.number()
});

interface ComponentProps {
  labelDate: string;
  nomFiltre: string;
  showDatePicker?: boolean;
  defaultDate?: Date;
}

export type DateComposeFormProps = ComponentProps & FormikComponentProps;

const DateComposeForm: React.FC<DateComposeFormProps> = props => {
  function setDatePickerValue(type: string, value: string) {}

  function jourChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    traiteDepassementJour(e.target);
    focusApresProchainChamps(e);
    setDatePickerValue(JOUR, e.target.value);
  }

  function moisChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    traiteDepassementMois(e.target);
    focusApresProchainChamps(e);
  }

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
  }

  const receDatePickerProps = {
    nomComposantjour: withNamespace(props.nomFiltre, JOUR),
    nomComposantMois: withNamespace(props.nomFiltre, MOIS),
    nomComposantAnnee: withNamespace(props.nomFiltre, ANNEE)
  } as ReceDatePickerProps;

  return (
    <>
      <div
        className={
          props.showDatePicker
            ? "DateComposeFormWithDatePicker"
            : "DateComposeForm"
        }
      >
        <label>{props.labelDate}</label>
        <Field
          component="input"
          name={withNamespace(props.nomFiltre, JOUR)}
          maxLength="2"
          onInput={jourChange}
          onBlur={(e: any) => traiteZeroAGauche(e, props.formik.handleChange)}
        />
        <div className="Sep">/</div>
        <Field
          component="input"
          name={withNamespace(props.nomFiltre, MOIS)}
          maxLength="2"
          onInput={moisChange}
          onBlur={(e: any) => traiteZeroAGauche(e, props.formik.handleChange)}
        />

        <div className="Sep">/</div>
        <Field
          component="input"
          name={withNamespace(props.nomFiltre, ANNEE)}
          maxLength="4"
          onInput={anneeChange}
        />
        {props.showDatePicker && <ReceDatePicker {...receDatePickerProps} />}
      </div>
      <div className="BlockErreur">
        <ErrorMessage
          component="div"
          name={withNamespace(props.nomFiltre, JOUR)}
        />
        <ErrorMessage
          component="div"
          name={withNamespace(props.nomFiltre, MOIS)}
        />
        <ErrorMessage
          component="div"
          name={withNamespace(props.nomFiltre, ANNEE)}
        />
      </div>
    </>
  );
};

export default connect(DateComposeForm);
