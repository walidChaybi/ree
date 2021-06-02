import { connect } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../ressources/Regex";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  DateValidationSchemaSansTestFormat
} from "../../../../common/widget/formulaire/DateComposeForm";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../common/widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import {
  DATE_EVENEMENT,
  PAYS_EVENEMENT,
  VILLE_EVENEMENT
} from "../../modelForm/ISaisirRequetePageModel";
import "./scss/EvenementForm.scss";

// Valeurs par défaut des champs
export const EvenementFormDefaultValues = {
  [DATE_EVENEMENT]: DateDefaultValues,
  [VILLE_EVENEMENT]: "",
  [PAYS_EVENEMENT]: ""
};

// Schéma de validation des champs
export const EvenementFormValidationSchema = Yup.object().shape({
  [DATE_EVENEMENT]: DateValidationSchemaSansTestFormat,
  [VILLE_EVENEMENT]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PAYS_EVENEMENT]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  )
});

interface EvenementFormProps {
  libelle: string;
}

export type EvenementSubFormProps = SubFormProps & EvenementFormProps;

const EvenementForm: React.FC<EvenementSubFormProps> = props => {
  const villeWithNamespace = withNamespace(props.nom, VILLE_EVENEMENT);
  const paysWithNamespace = withNamespace(props.nom, PAYS_EVENEMENT);

  const dateEvenementComposeFormProps = {
    labelDate: getLibelle(`Date et lieu de ${props.libelle}`),
    nomDate: withNamespace(props.nom, DATE_EVENEMENT),
    anneeMax: new Date().getFullYear()
  } as DateComposeFormProps;

  useEffect(() => {
    if (props.reset) {
      props.formik.setFieldValue(props.nom, EvenementFormDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset]);

  return (
    <>
      <div className="DateLieu">
        <div className="DateEvenement">
          <DateComposeForm {...dateEvenementComposeFormProps}></DateComposeForm>
        </div>
        <div>
          <InputField
            name={withNamespace(props.nom, VILLE_EVENEMENT)}
            label={getLibelle("à")}
            placeholder={getLibelle(`Ville de ${props.libelle}`)}
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
        name={withNamespace(props.nom, PAYS_EVENEMENT)}
        label={getLibelle(`Pays de ${props.libelle}`)}
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

export default connect(EvenementForm);
