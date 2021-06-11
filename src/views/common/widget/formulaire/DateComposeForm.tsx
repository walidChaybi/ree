import { connect, ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  MSG_CURRENT_YEAR_MAX,
  MSG_DATE_MEP_MIN,
  MSG_MIN_LENGTH_ANNEE,
  MSG_MIN_YEAR
} from "../../../../ressources/messages";
import {
  ANNEE,
  JOUR,
  MOIS
} from "../../../pages/saisirRequete/modelForm/ISaisirRequetePageModel";
import {
  estDateReceValide,
  estDateValide,
  getDateComposeFromDate,
  getIsoStringFromDateCompose,
  IDateCompose,
  MEP_YEAR,
  MIN_LENGTH_ANNEE,
  MIN_YEAR
} from "../../util/DateUtils";
import { IconeCroix } from "../icones/IconeCroix";
import { getLibelle } from "../Text";
import ReceDatePicker from "./datePicker/ReceDatePicker";
import "./scss/DateComposeForm.scss";
import {
  digitSeulement,
  focusApresProchainChamps,
  traiteCarAutorises,
  traiteDepassementJour,
  traiteDepassementMois,
  traiteZeroAGauche
} from "./utils/ControlesUtil";
import { FormikComponentProps, withNamespace } from "./utils/FormUtil";

// Valeurs par défaut des champs
export const DateDefaultValues = {
  [JOUR]: "",
  [MOIS]: "",
  [ANNEE]: ""
};

// Schéma de validation des champs
export const DateValidationSchema = Yup.object()
  .shape({
    [JOUR]: Yup.number(),
    [MOIS]: Yup.number(),
    [ANNEE]: Yup.number()
  })
  .test("formatDateInvalide", function (date: any, error: any) {
    const dateCompose = date as IDateCompose;
    if (!dateCompose) {
      return true;
    }

    if (!dateCompose.jour && !dateCompose.mois && !dateCompose.annee) {
      return true;
    }

    const paramsError = {
      path: `${error.path}.annee`,
      message: getLibelle(
        "Date ou format invalide (formats autorisés: JJ/MM/AAAA, MM/AAAA, AAAA)"
      )
    };

    return !estDateReceValide(dateCompose)
      ? this.createError(paramsError)
      : true;
  });

export const DateValidationSchemaSansTestFormat = Yup.object().shape({
  [JOUR]: Yup.number(),
  [MOIS]: Yup.number(),
  [ANNEE]: Yup.number()
});

interface ComponentProps {
  labelDate: string;
  nomDate: string;
  showDatePicker?: boolean;
  onChange?: (date: IDateComposeForm) => void;
  disabled?: boolean;
  anneeMin?: number;
  anneeMax?: number;
}

export type DateComposeFormProps = ComponentProps & FormikComponentProps;

export interface IDateComposeForm {
  jour?: string;
  mois?: string;
  annee?: string;
}

const DateComposeForm: React.FC<DateComposeFormProps> = props => {
  const [dateSaisie, setDateSaisie] = useState<IDateComposeForm>({});

  const dateMini = props.anneeMin
    ? new Date(`${props.anneeMin}-01-01`)
    : undefined;

  const dateMaxi = props.anneeMax
    ? new Date(`${props.anneeMax}-12-31`)
    : undefined;

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
      props.formik.setFieldValue(withNamespace(props.nomDate, JOUR), "");
      props.formik.setFieldValue(withNamespace(props.nomDate, MOIS), "");
      props.formik.setFieldValue(withNamespace(props.nomDate, ANNEE), "");
      props.formik.setFieldTouched(props.nomDate, false, false);
    });
  }

  function validateAnnee(value: number) {
    if (value) {
      if (value.toString().length < MIN_LENGTH_ANNEE) {
        return MSG_MIN_LENGTH_ANNEE;
      }
      if (props.anneeMin && value < props.anneeMin) {
        if (props.anneeMin === MIN_YEAR) {
          return MSG_MIN_YEAR;
        } else if (props.anneeMin === MEP_YEAR) {
          return MSG_DATE_MEP_MIN;
        }
      } else if (
        props.anneeMax &&
        props.anneeMax === new Date().getFullYear() &&
        value > props.anneeMax
      ) {
        return MSG_CURRENT_YEAR_MAX;
      }
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
          name={withNamespace(props.nomDate, JOUR)}
          maxLength="2"
          onInput={jourChange}
          onBlur={(e: any) => traiteZeroAGauche(e, props.formik)}
          disabled={props.disabled}
          aria-label={`${props.nomDate}.jour`}
          placeholder="JJ"
        />
        <div className="Sep">/</div>
        <Field
          component="input"
          name={withNamespace(props.nomDate, MOIS)}
          maxLength="2"
          onInput={moisChange}
          onBlur={(e: any) => traiteZeroAGauche(e, props.formik)}
          disabled={props.disabled}
          aria-label={`${props.nomDate}.mois`}
          placeholder="MM"
        />

        <div className="Sep">/</div>
        <Field
          component="input"
          name={withNamespace(props.nomDate, ANNEE)}
          maxLength="4"
          onInput={anneeChange}
          disabled={props.disabled}
          aria-label={`${props.nomDate}.annee`}
          validate={validateAnnee}
          placeholder="AAAA"
        />
        <IconeCroix onClick={videChamps} title="Vider les champs" />
        {props.showDatePicker && (
          <ReceDatePicker
            dateValue={buildDatePickerValue()}
            disabled={props.disabled}
            onChange={date => {
              onDatePickerValueChange(props, date, setDateSaisie);
            }}
            dateMini={dateMini}
            dateMaxi={dateMaxi}
          />
        )}
      </div>
      <div className="BlockErreur">
        <ErrorMessage name={withNamespace(props.nomDate, ANNEE)} />
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
      withNamespace(props.nomDate, JOUR),
      dateCompose.jour
    );
    props.formik.setFieldValue(
      withNamespace(props.nomDate, MOIS),
      dateCompose.mois
    );
    props.formik.setFieldValue(
      withNamespace(props.nomDate, ANNEE),
      dateCompose.annee
    );
    props.formik.setFieldTouched(props.nomDate, false, false);
    setDateSaisie(dateCompose);
    if (props.onChange) {
      props.onChange(dateCompose);
    }
  });
};
const TIME_OUT_MS = 100;
export const executeEnDiffere = (fct: any) => {
  setTimeout(fct, TIME_OUT_MS);
};

export default connect(DateComposeForm);
