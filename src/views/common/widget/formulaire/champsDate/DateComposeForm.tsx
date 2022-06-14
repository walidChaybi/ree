import { connect, ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import {
  ANNEE,
  JOUR,
  MOIS
} from "../../../../pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";
import {
  NB_HEURE,
  NB_MINUTE
} from "../../../composant/formulaire/ConstantesNomsForm";
import { getDateComposeFromDate } from "../../../util/DateUtils";
import { executeEnDiffere } from "../../../util/Utils";
import { IconeCroix } from "../../icones/IconeCroix";
import ReceDatePicker from "../datePicker/ReceDatePicker";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import {
  digitSeulement,
  focusApresProchainChamps,
  traiteCarAutorises,
  traiteDepassementJour,
  traiteDepassementMois,
  traiteZeroAGauche
} from "../utils/ControlesUtil";
import { FormikComponentProps, withNamespace } from "../utils/FormUtil";
import { buildDatePickerValue, IDateComposeForm } from "./DateComposeFormUtil";
import { validateAnnee } from "./DateComposeFormValidation";
import "./scss/DateComposeForm.scss";

// Valeurs par défaut des champs
export const DateDefaultValues = {
  [JOUR]: "",
  [MOIS]: "",
  [ANNEE]: ""
};

export enum ChampDateModifie {
  JOUR,
  MOIS,
  ANNEE,
  TOUS
}
interface ComponentProps {
  labelDate: string;
  nomDate: string;
  showDatePicker?: boolean;
  showCroixSuppression?: boolean;
  onChange?: (date: IDateComposeForm, type?: ChampDateModifie) => void;
  disabled?: boolean;
  disabledHeure?: boolean; // Permet de surcharger le disabled global (dans le cas où il n'est pas renseigné c'est le disabled global qui fait foi)
  anneeMin?: number;
  anneeMax?: number;
  anneeObligatoire?: boolean;
  afficheHeure?: boolean;
}

export type DateComposeFormProps = ComponentProps & FormikComponentProps;

const DateComposeForm: React.FC<DateComposeFormProps> = props => {
  const [dateSaisie, setDateSaisie] = useState<IDateComposeForm>({});

  const dateMini = props.anneeMin
    ? new Date(`${props.anneeMin}-01-01`)
    : undefined;

  const dateMaxi = props.anneeMax
    ? new Date(`${props.anneeMax}-12-31`)
    : undefined;

  function buildDateSaisie(type: ChampDateModifie, value: string) {
    const newDate = { ...dateSaisie };
    switch (type) {
      case ChampDateModifie.JOUR:
        newDate.jour = value;
        break;
      case ChampDateModifie.MOIS:
        newDate.mois = value;
        break;
      case ChampDateModifie.ANNEE:
        newDate.annee = value;
        break;

      default:
        break;
    }
    setDateSaisie(newDate);
    if (props.onChange) {
      props.onChange(newDate, type);
    }
  }

  function jourChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    traiteDepassementJour(e.target);
    focusApresProchainChamps(e);
    buildDateSaisie(ChampDateModifie.JOUR, e.target.value);
  }

  function moisChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    traiteDepassementMois(e.target);
    focusApresProchainChamps(e);
    buildDateSaisie(ChampDateModifie.MOIS, e.target.value);
  }

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    buildDateSaisie(ChampDateModifie.ANNEE, e.target.value);
  }

  function heureMinuteChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
  }

  function videChamps(e: any) {
    e.preventDefault();
    executeEnDiffere(() => {
      setDateSaisie({});
      if (props.onChange) {
        props.onChange({}, ChampDateModifie.TOUS);
      }
      props.formik.setFieldValue(withNamespace(props.nomDate, JOUR), "");
      props.formik.setFieldValue(withNamespace(props.nomDate, MOIS), "");
      props.formik.setFieldValue(withNamespace(props.nomDate, ANNEE), "");
      props.formik.setFieldTouched(props.nomDate, false, false);
    });
  }

  // Par défaut la crois de suppression est affichée
  const showCroixSuppression =
    props.showCroixSuppression != null ? props.showCroixSuppression : true;

  const disabledHeure =
    props.disabledHeure == null ? props.disabled : props.disabledHeure;

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
          validate={(value: any) =>
            validateAnnee(
              value,
              props.anneeMin,
              props.anneeMax,
              props.anneeObligatoire
            )
          }
          placeholder="AAAA"
        />
        {showCroixSuppression && !props.disabled && (
          <IconeCroix onClick={videChamps} title="Vider les champs" />
        )}
        {props.showDatePicker && (
          <ReceDatePicker
            dateValue={buildDatePickerValue(dateSaisie)}
            disabled={props.disabled}
            onChange={date => {
              onDatePickerValueChange(props, date, setDateSaisie);
            }}
            dateMini={dateMini}
            dateMaxi={dateMaxi}
          />
        )}
        {props.afficheHeure && (
          <>
            <div className="Sep">à</div>
            <Field
              component="input"
              name={withNamespace(props.nomDate, NB_HEURE)}
              maxLength="2"
              onInput={heureMinuteChange}
              disabled={disabledHeure}
              aria-label={withNamespace(props.nomDate, NB_HEURE)}
              placeholder="hh"
            />
            <div className="Sep">h</div>
            <Field
              component="input"
              name={withNamespace(props.nomDate, NB_MINUTE)}
              maxLength="2"
              onInput={heureMinuteChange}
              disabled={disabledHeure}
              aria-label={withNamespace(props.nomDate, NB_MINUTE)}
              placeholder="mm"
            />
            <div className="Sep SepFin">mn</div>
          </>
        )}
      </div>
      <div className="BlockErreur">
        <ErrorMessage
          component={IconErrorMessage}
          name={withNamespace(props.nomDate, ANNEE)}
        />
        <ErrorMessage
          component={IconErrorMessage}
          name={withNamespace(props.nomDate, NB_HEURE)}
        />
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

export default connect<ComponentProps>(DateComposeForm);
