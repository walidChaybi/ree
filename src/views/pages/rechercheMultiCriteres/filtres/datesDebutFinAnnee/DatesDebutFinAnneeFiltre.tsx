import React, { useEffect, useState } from "react";
import { connect } from "formik";
import * as Yup from "yup";
import "../scss/FiltreRMC.scss";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  DateValidationSchema
} from "../../../../common/widget/formulaire/DateComposeForm";
import {
  withNamespace,
  FormikComponentProps,
  ComponentFiltreProps
} from "../../../../common/widget/formulaire/utils/FormUtil";
import {
  digitSeulement,
  traiteCarAutorises
} from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  IDateCompose,
  estDateVide,
  compareDatesCompose,
  MIN_YEAR
} from "../../../../common/util/DateUtils";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { MSG_MIN_YEAR } from "../../../../../ressources/messages";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

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
    [ANNEE]: Yup.number().min(MIN_YEAR, MSG_MIN_YEAR)
  })
  .test("dateFinInferieur", function (value, error) {
    const res = compareDatesCompose(
      (value[DATE_FIN] as any) as IDateCompose,
      (value[DATE_DEBUT] as any) as IDateCompose
    );

    const paramsError = {
      path: `${error.path}.dateFin`,
      message: getLibelle(
        "La date de fin doit être supérieure ou égale à la date de début"
      )
    };

    return res < 0 ? this.createError(paramsError) : true;
  })
  .test("dateDebutnonRenseignee", function (value, error) {
    const res =
      !estDateVide((value[DATE_DEBUT] as any) as IDateCompose) ||
      estDateVide((value[DATE_FIN] as any) as IDateCompose);

    const paramsError = {
      path: `${error.path}.dateDebut`,
      message: getLibelle("La date de début doit être renseignée")
    };

    return !res ? this.createError(paramsError) : true;
  });

interface AnneeInputProps {
  anneeVisible?: boolean;
  anneeMin?: number;
}

export type DatesDebutFinAnneeFiltreProps = AnneeInputProps &
  ComponentFiltreProps &
  FormikComponentProps;

const DatesDebutFinAnneeFiltre: React.FC<DatesDebutFinAnneeFiltreProps> = props => {
  const anneeVisible = props.anneeVisible ? props.anneeVisible : false;
  const [datesDisabled, setDatesDisabled] = useState<boolean>();
  const [anneeDisabled, setAnneeDisabled] = useState<boolean>();

  // Permet de dégriser les champs dates de creation ou année apres un resetForm.
  // Ou de griser les champs apres un rappelCriteres
  useEffect(() => {
    if (anneeVisible) {
      setAnneeDisabled(
        isDatesDirty(props.formik.values as IRMCActeInscription)
      );
      setDatesDisabled(
        isAnneeDirty(props.formik.values as IRMCActeInscription)
      );
    }
  }, [props.formik.dirty, props.formik.values, anneeVisible]);

  const dateDebutComposeFormProps = {
    labelDate: getLibelle("De "),
    nomDate: withNamespace(props.nomFiltre, DATE_DEBUT),
    showDatePicker: true,
    anneeMin: props.anneeMin
  } as DateComposeFormProps;

  const dateFinComposeFormProps = {
    labelDate: getLibelle("A "),
    nomDate: withNamespace(props.nomFiltre, DATE_FIN),
    showDatePicker: true,
    anneeMin: props.anneeMin
  } as DateComposeFormProps;

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
    if (e.target.value) {
      setDatesDisabled(true);
    } else {
      setDatesDisabled(false);
    }
  }

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={"Filtre date de création"}>
        <div className="FormFiltre">
          <DateComposeForm
            disabled={datesDisabled}
            {...dateDebutComposeFormProps}
          />

          <DateComposeForm
            disabled={datesDisabled}
            {...dateFinComposeFormProps}
          />

          {/* Recherche par annee uniquement */}
          {anneeVisible && (
            <InputField
              name={withNamespace(props.nomFiltre, ANNEE)}
              label={getLibelle("Année")}
              ariaLabel={`${props.nomFiltre} année`}
              maxLength="4"
              onInput={anneeChange}
              disabled={anneeDisabled}
            />
          )}
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(DatesDebutFinAnneeFiltre);

function isDatesDirty(values: IRMCActeInscription) {
  const dateDebut = values.datesDebutFinAnnee?.dateDebut;
  const dateFin = values.datesDebutFinAnnee?.dateFin;
  return (
    dateDebut?.jour !== "" ||
    dateDebut.mois !== "" ||
    dateDebut.annee !== "" ||
    dateFin?.jour !== "" ||
    dateFin.mois !== "" ||
    dateFin.annee !== ""
  );
}

function isAnneeDirty(values: IRMCActeInscription) {
  return values.datesDebutFinAnnee?.annee !== "";
}
