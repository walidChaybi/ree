import React, { useCallback, useEffect, useState } from "react";
import { ErrorMessage, connect } from "formik";
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
  FormikComponentProps,
  ComponentFiltreProps,
  isErrorString
} from "../../../../common/widget/formulaire/utils/FormUtil";
import {
  digitSeulement,
  traiteCarAutorises
} from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  IDateCompose,
  estDateVide,
  compareDatesCompose,
  MAX_YEAR
} from "../../../../common/util/DateUtils";
import { getLibelle } from "../../../../common/widget/Text";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { MSG_MAX_YEAR } from "../../../../../ressources/messages";

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
    [ANNEE]: Yup.number().min(MAX_YEAR, MSG_MAX_YEAR)
  })
  .test(
    "datesInvalides",
    getLibelle(
      "La date de fin doit être supérieure ou égale à la date de début"
    ),
    function (value) {
      const res = compareDatesCompose(
        (value[DATE_FIN] as any) as IDateCompose,
        (value[DATE_DEBUT] as any) as IDateCompose
      );
      return res >= 0;
    }
  );

export type DatesDebutFinAnneeFiltreProps = ComponentFiltreProps &
  FormikComponentProps;

const DatesDebutFinAnneeFiltre: React.FC<DatesDebutFinAnneeFiltreProps> = props => {
  const [dateDebut, setDateDebut] = useState<IDateComposeForm>();
  const [dateFin, setDateFin] = useState<IDateComposeForm>();
  const [datesDisabled, setDatesDisabled] = useState<boolean>();

  const anneeDisabled = useCallback(() => {
    return (
      !estDateVide(dateDebut as IDateCompose) ||
      !estDateVide(dateFin as IDateCompose)
    );
  }, [dateDebut, dateFin]);

  // Permet de dégriser les champs dates de creation ou année apres un resetForm.
  useEffect(() => {
    if (datesDisabled && !props.formik.dirty) {
      setDatesDisabled(false);
    }

    if (anneeDisabled() && !props.formik.dirty) {
      setDateDebut({ jour: "", mois: "", annee: "" });
      setDateFin({ jour: "", mois: "", annee: "" });
    }
  }, [props.formik.dirty, datesDisabled, setDatesDisabled, anneeDisabled]);

  const dateDebutComposeFormProps = {
    labelDate: getLibelle("De "),
    nomFiltre: withNamespace(props.nomFiltre, DATE_DEBUT),
    showDatePicker: true,
    onChange: onDateDebutChange
  } as DateComposeFormProps;

  const dateFinComposeFormProps = {
    labelDate: getLibelle("A "),
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
    <div className={`Filtre ${props.nomFiltre}`}>
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

        {isErrorString(props.formik.errors, props.nomFiltre) && (
          <div className="BlockErreur">
            <ErrorMessage name={props.nomFiltre} />
          </div>
        )}

        {/* Recherche par annee uniquement */}
        <InputField
          name={withNamespace(props.nomFiltre, ANNEE)}
          label={getLibelle("Année")}
          ariaLabel={`${props.nomFiltre} année`}
          maxLength="4"
          onInput={anneeChange}
          disabled={anneeDisabled()}
        />
      </div>
    </div>
  );
};

export default connect(DatesDebutFinAnneeFiltre);
