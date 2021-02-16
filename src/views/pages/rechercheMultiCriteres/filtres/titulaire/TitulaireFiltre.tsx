import React from "react";
import {
  Field,
  ErrorMessage,
  connect,
  FormikProps,
  FormikValues
} from "formik";
import * as Yup from "yup";
import "../scss/FiltreRMC.scss";
import DateComposeForm, {
  DateDefaultValues,
  DateValidationSchema,
  DateComposeFormProps
} from "../../../../common/widget/formulaire/DateComposeForm";
import {
  CARATERES_AUTORISES_MESSAGE,
  ASTERISQUE_MESSAGE
} from "../../../../common/widget/formulaire/FormulaireMessages";
import {
  CarateresAutoriseRecherche,
  AsterisqueRecherche
} from "../../../../../ressources/Regex";
import { withNamespace } from "../../../../common/widget/formulaire/utils/FormUtil";
import { traiteEspace } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Noms des champs
export const NOM = "nom";
export const PRENOM = "prenom";
export const DATE_NAISSANCE = "dateNaissance";
export const PAYS_NAISSANCE = "paysNaissance";

// Valeurs par défaut des champs
export const TitulaireDefaultValues = {
  [NOM]: "",
  [PRENOM]: "",
  [DATE_NAISSANCE]: DateDefaultValues,
  [PAYS_NAISSANCE]: ""
};

// Schéma de validation des champs
export const TitulaireValidationSchema = Yup.object({
  [NOM]: Yup.string()
    .matches(CarateresAutoriseRecherche, CARATERES_AUTORISES_MESSAGE)
    .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE),
  [PRENOM]: Yup.string()
    .matches(CarateresAutoriseRecherche, CARATERES_AUTORISES_MESSAGE)
    .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE),
  [DATE_NAISSANCE]: DateValidationSchema,
  [PAYS_NAISSANCE]: Yup.string()
    .matches(CarateresAutoriseRecherche, CARATERES_AUTORISES_MESSAGE)
    .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE)
});

export interface FiltreProps {
  nomFiltre: string;
}

const TitulaireFiltre: React.FC<any> = props => {
  const formik: FormikProps<FormikValues> = props.formik;

  const dateDebutComposeFormProps = {
    labelDate: "Date de naissance",
    nomFiltre: withNamespace(props.nomFiltre, DATE_NAISSANCE)
  } as DateComposeFormProps;

  function onBlurChamp(e: any) {
    traiteEspace(e, formik.handleChange);
    formik.handleBlur(e);
  }

  function switchNomPrenom() {
    const nomOld = formik.getFieldProps(withNamespace(props.nomFiltre, NOM))
      .value;
    const prenomOld = formik.getFieldProps(
      withNamespace(props.nomFiltre, PRENOM)
    ).value;
    formik.setFieldValue(withNamespace(props.nomFiltre, NOM), prenomOld);
    formik.setFieldValue(withNamespace(props.nomFiltre, PRENOM), nomOld);
  }

  return (
    <div className={`Filtre ${props.nomFiltre}`}>
      <div className="TitreFiltre">
        <span>Titulaire</span>
      </div>
      <div className="FormFiltre">
        <div className="BlockInput">
          <label htmlFor={withNamespace(props.nomFiltre, NOM)}>Nom</label>
          <Field
            component="input"
            name={withNamespace(props.nomFiltre, NOM)}
            id={withNamespace(props.nomFiltre, NOM)}
            onBlur={onBlurChamp}
          />
        </div>
        <div className="BlockErreur">
          <ErrorMessage name={withNamespace(props.nomFiltre, NOM)} />
        </div>

        <button
          className="BtnNomPrenom"
          type="button"
          onClick={switchNomPrenom}
        >
          Nom <FontAwesomeIcon icon={faArrowsAltH} /> Prénom
        </button>

        <div className="BlockInput">
          <label htmlFor={withNamespace(props.nomFiltre, PRENOM)}>Prénom</label>
          <Field
            component="input"
            name={withNamespace(props.nomFiltre, PRENOM)}
            id={withNamespace(props.nomFiltre, PRENOM)}
            onBlur={onBlurChamp}
          />
        </div>
        <div className="BlockErreur">
          <ErrorMessage name={withNamespace(props.nomFiltre, PRENOM)} />
        </div>

        <DateComposeForm {...dateDebutComposeFormProps} />

        <div className="BlockInput">
          <label htmlFor={withNamespace(props.nomFiltre, PAYS_NAISSANCE)}>
            Pays de naissance
          </label>
          <Field
            component="input"
            name={withNamespace(props.nomFiltre, PAYS_NAISSANCE)}
            id={withNamespace(props.nomFiltre, PAYS_NAISSANCE)}
            onBlur={onBlurChamp}
          />
        </div>
        <div className="BlockErreur">
          <ErrorMessage name={withNamespace(props.nomFiltre, PAYS_NAISSANCE)} />
        </div>
      </div>
    </div>
  );
};

export default connect(TitulaireFiltre);
