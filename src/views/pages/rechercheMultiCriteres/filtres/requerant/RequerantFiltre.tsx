import { Fieldset } from "@widget/fieldset/Fieldset";
import { ASTERISQUE_MESSAGE, CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { traiteEspace } from "@widget/formulaire/utils/ControlesUtil";
import { ComponentFiltreProps, FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { ASTERISQUE_PRECEDE_DEUX, CARACTERES_POST_ASTERISQUE, CaracteresAutorisesRecherche } from "../../../../../ressources/Regex";
import "../scss/FiltreRMC.scss";

// Noms des champs
const NOM = "nom";
const RAISON_SOCIALE = "raisonSociale";

// Valeurs par défaut des champs
export const RequerantDefaultValues = {
  [NOM]: "",
  [RAISON_SOCIALE]: ""
};

// Schéma de validation des champs
export const RequerantValidationSchema = Yup.object({
  [NOM]: Yup.string()
    .matches(CaracteresAutorisesRecherche, CARACTERES_AUTORISES_MESSAGE)
    .matches(ASTERISQUE_PRECEDE_DEUX, ASTERISQUE_MESSAGE)
    .matches(CARACTERES_POST_ASTERISQUE, ASTERISQUE_MESSAGE),

  [RAISON_SOCIALE]: Yup.string()
    .matches(CaracteresAutorisesRecherche, CARACTERES_AUTORISES_MESSAGE)
    .matches(ASTERISQUE_PRECEDE_DEUX, ASTERISQUE_MESSAGE)
    .matches(CARACTERES_POST_ASTERISQUE, ASTERISQUE_MESSAGE)
});

export type RequerantFiltreProps = ComponentFiltreProps & FormikComponentProps;

const RequerantFiltre: React.FC<RequerantFiltreProps> = props => {
  function onBlurChamp(e: any) {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  }

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={"Filtre requérant"}>
        <div className="FormFiltre">
          <InputField
            name={withNamespace(props.nomFiltre, NOM)}
            label={"Nom"}
            onBlur={onBlurChamp}
          />

          <InputField
            name={withNamespace(props.nomFiltre, RAISON_SOCIALE)}
            label={"Raison sociale / Institutionnel"}
            onBlur={onBlurChamp}
          />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(RequerantFiltre);
