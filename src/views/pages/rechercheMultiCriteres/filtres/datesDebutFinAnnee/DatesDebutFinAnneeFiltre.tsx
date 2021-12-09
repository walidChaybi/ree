import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  compareDatesCompose,
  estDateVide,
  IDateCompose
} from "../../../../common/util/DateUtils";
import { getLibelle } from "../../../../common/util/Utils";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  DateValidationSchema
} from "../../../../common/widget/formulaire/DateComposeForm";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
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
  anneeMin?: number;
}

export type DatesDebutFinAnneeFiltreProps = AnneeInputProps &
  ComponentFiltreProps &
  FormikComponentProps;

const DatesDebutFinAnneeFiltre: React.FC<DatesDebutFinAnneeFiltreProps> = props => {
  const dateDebutComposeFormProps = {
    labelDate: getLibelle("De "),
    nomDate: withNamespace(props.nomFiltre, DATE_DEBUT),
    showDatePicker: true,
    anneeMin: props.anneeMin
  } as DateComposeFormProps;

  const dateFinComposeFormProps = {
    labelDate: getLibelle("À "),
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
