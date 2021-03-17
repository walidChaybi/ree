import React, { useState } from "react";
import { Field, ErrorMessage, connect } from "formik";
import * as Yup from "yup";
import "./scss/DateComposeForm.scss";
import ReceDatePicker from "./datePicker/ReceDatePicker";
import {
  traiteDepassementJour,
  traiteDepassementMois,
  digitSeulement,
  focusApresProchainChamps,
  traiteCarAutorises,
  traiteZeroAGauche
} from "./utils/ControlesUtil";
import {
  withNamespace,
  FormikComponentProps,
  isErrorString
} from "./utils/FormUtil";
import {
  estDateValide,
  getIsoStringFromDateCompose,
  IDateCompose,
  getDateComposeFromDate,
  estDateReceValide,
  MIN_YEAR
} from "../../util/DateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { MSG_MIN_YEAR, MSG_MEP_YEAR } from "../../../../ressources/messages";

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
export const DateValidationSchema = Yup.object()
  .shape({
    [ANNEE]: Yup.number()
  })
  .test(
    "dateInvalide",
    "Date ou format invalide (formats autorisés: JJ/MM/AAAA, MM/AAAA, AAAA)",
    function (date) {
      const dateCompose = (date as any) as IDateCompose;
      if (!dateCompose) {
        return true;
      }

      if (!dateCompose.jour && !dateCompose.mois && !dateCompose.annee) {
        return true;
      }
      return estDateReceValide(dateCompose);
    }
  );
interface ComponentProps {
  labelDate: string;
  nomFiltre: string;
  showDatePicker?: boolean;
  onChange?: (date: IDateComposeForm) => void;
  disabled?: boolean;
  anneeMin?: number;
}

export type DateComposeFormProps = ComponentProps & FormikComponentProps;

export interface IDateComposeForm {
  jour?: string;
  mois?: string;
  annee?: string;
}

const DateComposeForm: React.FC<DateComposeFormProps> = props => {
  const [dateSaisie, setDateSaisie] = useState<IDateComposeForm>({});

  const minDate = props.anneeMin
    ? `${props.anneeMin}-01-01`
    : `${MIN_YEAR}-01-01`;

  function buildDatePickerValue(): Date {
    let datePickerValue = new Date();
    const dateSaisieComplete = { ...dateSaisie };

    const date = getDateComposeFromDate(new Date());
    if (!dateSaisie.jour) {
      dateSaisieComplete.jour = date.jour;
    }
    if (!dateSaisie.mois) {
      dateSaisieComplete.mois = date.mois;
    }
    if (!dateSaisie.annee) {
      dateSaisieComplete.annee = date.annee;
    }

    if (estDateValide(dateSaisieComplete as IDateCompose)) {
      datePickerValue = new Date(
        getIsoStringFromDateCompose(dateSaisieComplete as IDateCompose)
      );
    }

    return datePickerValue;
  }

  function buildDateSaisie(type: string, value: string) {
    const newDate = { ...dateSaisie };
    switch (type) {
      case JOUR:
        newDate.jour = value;
        break;
      case MOIS:
        newDate.mois = value;
        break;
      case ANNEE:
        newDate.annee = value;
        break;

      default:
        break;
    }
    setDateSaisie(newDate);
    if (props.onChange) {
      props.onChange(newDate);
    }
  }

  function jourChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    traiteDepassementJour(e.target);
    focusApresProchainChamps(e);
    buildDateSaisie(JOUR, e.target.value);
  }

  function moisChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    traiteDepassementMois(e.target);
    focusApresProchainChamps(e);
    buildDateSaisie(MOIS, e.target.value);
  }

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    buildDateSaisie(ANNEE, e.target.value);
  }

  function videChamps(e: any) {
    e.preventDefault();
    executeEnDiffere(() => {
      setDateSaisie({});
      if (props.onChange) {
        props.onChange({});
      }
      props.formik.setFieldValue(withNamespace(props.nomFiltre, JOUR), "");
      props.formik.setFieldValue(withNamespace(props.nomFiltre, MOIS), "");
      props.formik.setFieldValue(withNamespace(props.nomFiltre, ANNEE), "");
      props.formik.setFieldTouched(props.nomFiltre, false, false);
    });
  }

  function validateAnnee(value: number) {
    if (value && props.anneeMin && value < props.anneeMin) {
      return MSG_MEP_YEAR;
    } else if (value && !props.anneeMin && value < MIN_YEAR) {
      return MSG_MIN_YEAR;
    }
  }

  return (
    <>
      <div
        className={
          (props.showDatePicker
            ? "DateComposeFormWithDatePicker "
            : "DateComposeForm") + " DateComposeForm-common"
        }
      >
        <label>{props.labelDate}</label>
        <Field
          component="input"
          name={withNamespace(props.nomFiltre, JOUR)}
          maxLength="2"
          onInput={jourChange}
          onBlur={(e: any) => traiteZeroAGauche(e, props.formik)}
          disabled={props.disabled}
          aria-label={`${props.nomFiltre} jour`}
        />
        <div className="Sep">/</div>
        <Field
          component="input"
          name={withNamespace(props.nomFiltre, MOIS)}
          maxLength="2"
          onInput={moisChange}
          onBlur={(e: any) => traiteZeroAGauche(e, props.formik)}
          disabled={props.disabled}
          aria-label={`${props.nomFiltre} mois`}
        />

        <div className="Sep">/</div>
        <Field
          component="input"
          name={withNamespace(props.nomFiltre, ANNEE)}
          maxLength="4"
          onInput={anneeChange}
          disabled={props.disabled}
          aria-label={`${props.nomFiltre} année`}
          validate={validateAnnee}
        />
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="xs"
          className="IconeCroix"
          onClick={videChamps}
          title="Vider les champs"
        />
        {props.showDatePicker && (
          <ReceDatePicker
            dateValue={buildDatePickerValue()}
            disabled={props.disabled}
            onChange={date => {
              onDatePickerValueChange(props, date, setDateSaisie);
            }}
            minDate={new Date(minDate)}
          />
        )}
      </div>
      <div className="BlockErreur">
        {isErrorString(props.formik.errors, props.nomFiltre) && (
          <ErrorMessage name={props.nomFiltre} />
        )}
        <ErrorMessage name={withNamespace(props.nomFiltre, ANNEE)} />
      </div>
    </>
  );
};

export const onDatePickerValueChange = (
  props: any,
  date: Date,
  setDateSaisie: any
) => {
  const dateCompose = getDateComposeFromDate(date) as IDateComposeForm;
  executeEnDiffere(() => {
    props.formik.setFieldValue(
      withNamespace(props.nomFiltre, JOUR),
      dateCompose.jour
    );
    props.formik.setFieldValue(
      withNamespace(props.nomFiltre, MOIS),
      dateCompose.mois
    );
    props.formik.setFieldValue(
      withNamespace(props.nomFiltre, ANNEE),
      dateCompose.annee
    );
    props.formik.setFieldTouched(props.nomFiltre, false, false);
    setDateSaisie(dateCompose);
    if (props.onChange) {
      props.onChange(dateCompose);
    }
  });
};
const TIME_OUT_MS = 100;
const executeEnDiffere = (fct: any) => {
  setTimeout(fct, TIME_OUT_MS);
};

export default connect(DateComposeForm);
