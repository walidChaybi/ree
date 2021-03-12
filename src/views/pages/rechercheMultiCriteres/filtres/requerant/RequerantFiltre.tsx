import React from "react";
import { connect } from "formik";
import * as Yup from "yup";
import "../scss/FiltreRMC.scss";
import {
  CARATERES_AUTORISES_MESSAGE,
  ASTERISQUE_MESSAGE
} from "../../../../common/widget/formulaire/FormulaireMessages";
import {
  CarateresAutoriseRecherche,
  AsterisqueRecherche
} from "../../../../../ressources/Regex";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { traiteEspace } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { getLibelle } from "../../../../common/widget/Text";

// Noms des champs
export const NOM = "nom";
export const RAISON_SOCIALE = "raisonSociale";

// Valeurs par défaut des champs
export const RequerantDefaultValues = {
  [NOM]: "",
  [RAISON_SOCIALE]: ""
};

// Schéma de validation des champs
export const RequerantValidationSchema = Yup.object({
  [NOM]: Yup.string()
    .matches(CarateresAutoriseRecherche, CARATERES_AUTORISES_MESSAGE)
    .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE),
  [RAISON_SOCIALE]: Yup.string()
    .matches(CarateresAutoriseRecherche, CARATERES_AUTORISES_MESSAGE)
    .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE)
});

export type RequerantFiltreProps = ComponentFiltreProps & FormikComponentProps;

const RequerantFiltre: React.FC<RequerantFiltreProps> = props => {
  function onBlurChamp(e: any) {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  }

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre requérant")}>
        <div className="FormFiltre">
          <InputField
            name={withNamespace(props.nomFiltre, NOM)}
            label={getLibelle("Nom")}
            onBlur={onBlurChamp}
          />

          <InputField
            name={withNamespace(props.nomFiltre, RAISON_SOCIALE)}
            label={getLibelle("Raison sociale / Institutionnel")}
            onBlur={onBlurChamp}
          />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(RequerantFiltre);
