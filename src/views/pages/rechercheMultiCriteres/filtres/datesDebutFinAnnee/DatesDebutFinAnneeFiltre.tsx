import React, { useState } from "react";
import { Field, ErrorMessage, connect } from "formik";
import * as Yup from "yup";
import "../scss/FiltreRMC.scss";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  DateValidationSchema,
  IDateComposeForm
} from "../../../../common/widget/formulaire/DateComposeForm";
import {
  withNamespace,
  FormikComponentProps
} from "../../../../common/widget/formulaire/utils/FormUtil";
import {
  digitSeulement,
  traiteCarAutorises
} from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  IDateCompose,
  estDateVide,
  compareDatesCompose
} from "../../../../common/util/DateUtils";

// Noms des champs
export const DATE_DEBUT = "dateDebut";
export const DATE_FIN = "dateFin";
export const ANNEE = "annee";
export const dateFinInfDateDebutError = "dateFinInfDateDebutError";

// Valeurs par défaut des champs
export const DatesDebutFinAnneeDefaultValues = {
  [DATE_DEBUT]: DateDefaultValues,
  [DATE_FIN]: DateDefaultValues,
  [ANNEE]: ""
};

// Schéma de validation des champs
export const DatesDebutFinAnneeValidationSchema = Yup.object()
  .shape({
    [DATE_DEBUT]: DateValidationSchema,
    [DATE_FIN]: DateValidationSchema,
    [ANNEE]: Yup.number()
  })
  .test("DatesInvalides", "Les dates sont invalides !", function (
    value,
    other
  ) {
    const res = compareDatesCompose(
      (value[DATE_FIN] as any) as IDateCompose,
      (value[DATE_DEBUT] as any) as IDateCompose
    );
    if (res >= 0) {
      return true;
    } else {
      return this.createError({
        path: dateFinInfDateDebutError,
        message: "Date de fin inf date début"
      });
    }
  });

interface ComponentProps {
  nomFiltre: string;
  key: string;
}

export type DatesDebutFinAnneeFiltreProps = ComponentProps &
  FormikComponentProps;

const DatesDebutFinAnneeFiltre: React.FC<DatesDebutFinAnneeFiltreProps> = props => {
  const [dateDebut, setDateDebut] = useState<IDateComposeForm>();
  const [dateFin, setDateFin] = useState<IDateComposeForm>();
  const [datesDisabled, setDatesDisabled] = useState<boolean>();

  const dateDebutComposeFormProps = {
    labelDate: "De: ",
    nomFiltre: withNamespace(props.nomFiltre, DATE_DEBUT),
    showDatePicker: true,
    onChange: onDateDebutChange
  } as DateComposeFormProps;

  const dateFinComposeFormProps = {
    labelDate: "A: ",
    nomFiltre: withNamespace(props.nomFiltre, DATE_FIN),
    showDatePicker: true,
    onChange: onDateFinChange
  } as DateComposeFormProps;

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    if (e.target.value) {
      setDatesDisabled(true);
    } else {
      setDatesDisabled(false);
    }
  }

  function onDateDebutChange(dateCompose: IDateComposeForm) {
    setDateDebut(dateCompose);
  }

  function onDateFinChange(dateCompose: IDateComposeForm) {
    setDateFin(dateCompose);
  }

  return (
    <div className={`Filtre ${props.nomFiltre}`} key={props.key}>
      <div className="TitreFiltre">
        <span>Filtre date de création</span>
      </div>
      <div className="FormFiltre">
        <DateComposeForm
          disabled={datesDisabled}
          {...dateDebutComposeFormProps}
        />

        <DateComposeForm
          disabled={datesDisabled}
          {...dateFinComposeFormProps}
        />

        {props.formik.errors.dateFinInfDateDebutError && (
          <div className="BlockErreur">
            La date de fin doit être supérieure ou égale à la date de début
          </div>
        )}

        {/* Recherche par annee uniquement */}
        <div className="BlockInput">
          <label htmlFor={withNamespace(props.nomFiltre, ANNEE)}>Année:</label>
          <Field
            aria-label={`${props.nomFiltre} année`}
            component="input"
            name={withNamespace(props.nomFiltre, ANNEE)}
            id={withNamespace(props.nomFiltre, ANNEE)}
            maxLength="4"
            onInput={anneeChange}
            disabled={
              !estDateVide(dateDebut as IDateCompose) ||
              !estDateVide(dateFin as IDateCompose)
            }
          />
        </div>
        <div className="BlockErreur">
          <ErrorMessage name={withNamespace(props.nomFiltre, ANNEE)} />
        </div>
      </div>
    </div>
  );
};

export default connect(DatesDebutFinAnneeFiltre);
