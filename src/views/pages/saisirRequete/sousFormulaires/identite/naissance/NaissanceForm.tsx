import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  DateValidationSchemaSansTestFormat
} from "../../../../../common/widget/formulaire/DateComposeForm";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../../common/widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import {
  DATE_NAISSANCE,
  PAYS_NAISSANCE,
  VILLE_NAISSANCE
} from "../../../modelForm/ISaisirRDCSCPageModel";
import "./scss/NaissanceForm.scss";

// Valeurs par défaut des champs
export const NaissanceFormDefaultValues = {
  [DATE_NAISSANCE]: DateDefaultValues,
  [VILLE_NAISSANCE]: "",
  [PAYS_NAISSANCE]: ""
};

// Schéma de validation des champs
export const NaissanceFormValidationSchema = Yup.object().shape({
  [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
  [VILLE_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PAYS_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  )
});

const NaissanceForm: React.FC<SubFormProps> = props => {
  const villeWithNamespace = withNamespace(props.nom, VILLE_NAISSANCE);
  const paysWithNamespace = withNamespace(props.nom, PAYS_NAISSANCE);

  const dateNaissanceComposeFormProps = {
    labelDate: getLibelle("Date et lieu de naissance "),
    nomDate: withNamespace(props.nom, DATE_NAISSANCE),
    anneeMax: new Date().getFullYear()
  } as DateComposeFormProps;

  return (
    <>
      <div className="DateLieu">
        <div className="DateNaissance">
          <DateComposeForm {...dateNaissanceComposeFormProps}></DateComposeForm>
        </div>
        <div>
          <InputField
            name={withNamespace(props.nom, VILLE_NAISSANCE)}
            label={getLibelle("à")}
            placeholder={getLibelle("Ville de naissance")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                villeWithNamespace
              )
            }
          />
        </div>
      </div>
      <InputField
        name={withNamespace(props.nom, PAYS_NAISSANCE)}
        label={getLibelle("Pays de naissance")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e =>
          sortieChampPremiereLettreEnMajuscule(
            e,
            props.formik,
            paysWithNamespace
          )
        }
      />
    </>
  );
};

export default connect(NaissanceForm);
