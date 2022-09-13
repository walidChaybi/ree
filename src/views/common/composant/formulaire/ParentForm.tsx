import {
  NOM_NAISSANCE,
  PRENOMS
} from "@pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";
import PrenomsForm, {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { sortieChampEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  INomForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../ressources/Regex";
import "./scss/ParentForm.scss";

// Valeurs par défaut des champs
export const ParentFormDefaultValues = {
  [NOM_NAISSANCE]: "",
  [PRENOMS]: PrenomsFormDefaultValues
};

// Schéma de validation des champs
export const ParentFormValidationSchema = Yup.object().shape({
  [NOM_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PRENOMS]: PrenomsFormValidationSchema
});

interface ParentFormProps {
  index?: number;
  nePasAfficherTitre?: boolean;
}

export type ParentSubFormProps = SubFormProps & ParentFormProps;

const ParentForm: React.FC<ParentSubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM_NAISSANCE);

  const prenomsFormProps = {
    nom: withNamespace(props.nom, PRENOMS)
  } as SubFormProps;

  useEffect(() => {
    if (props.reset) {
      props.formik.setFieldValue(props.nom, ParentFormDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset]);

  return (
    <>
      {!props.nePasAfficherTitre && (
        <div className="TitreParent">Parent {props.index}</div>
      )}
      <InputField
        name={nomWithNamespace}
        label={getLibelle("Nom de naissance")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e => sortieChampEnMajuscule(e, props.formik, nomWithNamespace)}
      />
      <PrenomsForm {...prenomsFormProps} />
    </>
  );
};

export default connect<ParentFormProps & INomForm>(ParentForm);
