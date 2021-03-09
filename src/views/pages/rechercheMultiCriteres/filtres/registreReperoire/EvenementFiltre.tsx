import React from "react";
import { ErrorMessage, connect, FormikProps, FormikValues } from "formik";
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
  ComponentFiltreProps,
  isErrorString
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../common/widget/formulaire/FormulaireMessages";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { traiteEspace } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import { CarateresAutoriseRecherche } from "../../../../../ressources/Regex";
import { getLibelle } from "../../../../common/widget/Text";

// Noms des champs
export const DATE_EVENEMENT = "dateEvenement";
export const PAYS_EVENEMENT = "paysEvenement";

// Valeurs par défaut des champs
export const EvenementDefaultValues = {
  [DATE_EVENEMENT]: DateDefaultValues,
  [PAYS_EVENEMENT]: ""
};

// Schéma de validation des champs
export const EvenementValidationSchema = Yup.object().shape({
  [DATE_EVENEMENT]: DateValidationSchema,
  [PAYS_EVENEMENT]: Yup.string().matches(
    CarateresAutoriseRecherche,
    CARATERES_AUTORISES_MESSAGE
  )
});

export type EvenementFiltreProps = ComponentFiltreProps & FormikComponentProps;

const EvenementFiltre: React.FC<EvenementFiltreProps> = props => {
  const formik: FormikProps<FormikValues> = props.formik;

  const dateEvenementWithNamespace = withNamespace(
    props.nomFiltre,
    DATE_EVENEMENT
  );
  const paysEvenementWithNamespace = withNamespace(
    props.nomFiltre,
    PAYS_EVENEMENT
  );

  const dateEvenementComposeFormProps = {
    labelDate: getLibelle("Date de l'évenement"),
    nomFiltre: dateEvenementWithNamespace,
    showDatePicker: false
  } as DateComposeFormProps;

  function onBlurChamp(e: any) {
    traiteEspace(e, formik.handleChange);
    formik.handleBlur(e);
  }

  return (
    <>
      <DateComposeForm {...dateEvenementComposeFormProps} />

      {isErrorString(props.formik.errors, props.nomFiltre) && (
        <div className="BlockErreur">
          <ErrorMessage name={props.nomFiltre} />
        </div>
      )}
      <InputField
        disabled={props.filtreInactif}
        title="Le pays de l'évènement ne concerne que les actes ou les PACS"
        name={paysEvenementWithNamespace}
        label={getLibelle("Pays de l'évenement")}
        onBlur={onBlurChamp}
      />
    </>
  );
};

export default connect(EvenementFiltre);
