import React from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../scss/FiltreRMC.scss";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  DateValidationSchema
} from "../../../../common/widget/formulaire/DateComposeForm";

// Noms des champs
export const DATE_DEBUT = "dateDebut";
export const DATE_FIN = "dateFin";
export const ANNEE = "annee";

// Valeurs par défaut des champs
export const DatesDebutFinAnneeDefaultValues = {
  [DATE_DEBUT]: DateDefaultValues,
  [DATE_FIN]: DateDefaultValues,
  [ANNEE]: ""
};

// Schéma de validation des champs
export const DatesDebutFinAnneeValidationSchema = Yup.object({
  [DATE_DEBUT]: DateValidationSchema,
  [DATE_FIN]: DateValidationSchema,
  [ANNEE]: Yup.number().typeError("Année invalide")
});

export interface DatesDebutFinAnneeFiltreProps {
  nomFiltre: string;
}

export const DatesDebutFinAnneeFiltre: React.FC<DatesDebutFinAnneeFiltreProps> = props => {
  function withNamespace(nomChamp: string) {
    return props.nomFiltre ? `${props.nomFiltre}.${nomChamp}` : nomChamp;
  }

  const dateDebutComposeFormProps = {
    labelDate: "De: ",
    nomFiltre: withNamespace(DATE_DEBUT),
    showDatePicker: true
  } as DateComposeFormProps;

  const dateFinComposeFormProps = {
    labelDate: "A: ",
    nomFiltre: withNamespace(DATE_FIN),
    showDatePicker: true
  } as DateComposeFormProps;

  return (
    <div className={`Filtre ${props.nomFiltre}`}>
      <div className="TitreFiltre">
        <span>Filtre date de création</span>
      </div>
      <div className="FormFiltre">
        <DateComposeForm {...dateDebutComposeFormProps} />

        <DateComposeForm {...dateFinComposeFormProps} />

        {/* Recherche par annee uniquement */}
        <div className="BlockInput">
          <label htmlFor={withNamespace(ANNEE)}>Année:</label>
          <Field
            component="input"
            name={withNamespace(ANNEE)}
            id={withNamespace(ANNEE)}
          />
        </div>
        <div className="BlockErreur">
          <ErrorMessage name={withNamespace(ANNEE)} />
        </div>
      </div>
    </div>
  );
};
