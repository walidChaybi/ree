import { MIN_YEAR } from "@util/DateUtils";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues
} from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { traiteEspace } from "@widget/formulaire/utils/ControlesUtil";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CarateresAutoriseRecherche } from "../../../../../ressources/Regex";
import "../scss/FiltreRMC.scss";

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
  const dateEvenementWithNamespace = withNamespace(
    props.nomFiltre,
    DATE_EVENEMENT
  );
  const paysEvenementWithNamespace = withNamespace(
    props.nomFiltre,
    PAYS_EVENEMENT
  );

  const dateEvenementComposeFormProps = {
    labelDate: getLibelle("Date de l'évènement"),
    nomDate: dateEvenementWithNamespace,
    showDatePicker: false,
    anneeMin: MIN_YEAR
  } as DateComposeFormProps;

  function onBlurChamp(e: any) {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  }

  return (
    <Fieldset titre={getLibelle("Filtre évènement")}>
      <div className="FormFiltre">
        <DateComposeForm {...dateEvenementComposeFormProps} />
        <InputField
          disabled={props.filtreInactif}
          title="Le pays de l'évènement ne concerne que les actes ou les PACS"
          name={paysEvenementWithNamespace}
          label={getLibelle("Pays de l'évènement")}
          onBlur={onBlurChamp}
        />
      </div>
    </Fieldset>
  );
};

export default connect(EvenementFiltre);
