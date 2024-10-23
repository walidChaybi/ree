import DateUtils, { IDateCompose } from "@util/DateUtils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import DateComposeForm, { DateComposeFormProps, DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { ComponentFiltreProps, FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import "../scss/FiltreRMC.scss";

// Noms des champs
export const DATE_DEBUT = "dateDebut";
export const DATE_FIN = "dateFin";

export const dateFinInfDateDebutError = "dateFinInfDateDebutError";

// Valeurs par défaut des champs
export const DatesDebutFinAnneeDefaultValues = {
  [DATE_DEBUT]: DateDefaultValues,
  [DATE_FIN]: DateDefaultValues
};

// Schéma de validation des champs
export const DatesDebutFinAnneeValidationSchema = Yup.object()
  .shape({
    [DATE_DEBUT]: DateValidationSchema,
    [DATE_FIN]: DateValidationSchema
  })
  .test("dateFinInferieur", function (value, error) {
    const res = DateUtils.compareDatesCompose(value[DATE_FIN] as any as IDateCompose, value[DATE_DEBUT] as any as IDateCompose);

    const paramsError = {
      path: `${error.path}.dateFin`,
      message: "La date de fin doit être supérieure ou égale à la date de début"
    };

    return res < 0 ? this.createError(paramsError) : true;
  })
  .test("dateDebutnonRenseignee", function (value, error) {
    const res =
      !DateUtils.estDateVide(value[DATE_DEBUT] as any as IDateCompose) || DateUtils.estDateVide(value[DATE_FIN] as any as IDateCompose);

    const paramsError = {
      path: `${error.path}.dateDebut`,
      message: "La date de début doit être renseignée"
    };

    return !res ? this.createError(paramsError) : true;
  });

interface AnneeInputProps {
  anneeMin?: number;
}

export type DatesDebutFinAnneeFiltreProps = AnneeInputProps & ComponentFiltreProps & FormikComponentProps;

const DatesDebutFinAnneeFiltre: React.FC<DatesDebutFinAnneeFiltreProps> = props => {
  const dateDebutComposeFormProps = {
    labelDate: "De ",
    nomDate: withNamespace(props.nomFiltre, DATE_DEBUT),
    showDatePicker: true,
    anneeMin: props.anneeMin
  } as DateComposeFormProps;

  const dateFinComposeFormProps = {
    labelDate: "À ",
    nomDate: withNamespace(props.nomFiltre, DATE_FIN),
    showDatePicker: true,
    anneeMin: props.anneeMin
  } as DateComposeFormProps;

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={"Filtre date de création informatique"}>
        <div className="FormFiltre">
          <DateComposeForm {...dateDebutComposeFormProps} />
          <DateComposeForm {...dateFinComposeFormProps} />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(DatesDebutFinAnneeFiltre);
