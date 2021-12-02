import { connect } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../../ressources/Regex";
import { InputField } from "../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../../../common/widget/formulaire/FormulaireMessages";
import { sortieChampEnMajuscule } from "../../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../../common/widget/Text";
import {
  NOM_NAISSANCE,
  PRENOMS
} from "../../../modelForm/ISaisirRequetePageModel";
import PrenomsForm, {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "../nomsPrenoms/PrenomsForm";
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
  index: number;
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
      <div className="TitreParent">Parent {props.index}</div>
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

export default connect(ParentForm);
