import { PRENOMS } from "@composant/formulaire/ConstantesNomsForm";
import { getLibelle } from "@util/Utils";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
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
import { CaracteresAutorises } from "../../../../ressources/Regex";
import { NOM_NAISSANCE } from "./ConstantesNomsForm";
import PrenomsForm, {
  creerValidationSchemaPrenom,
  genererDefaultValuesPrenoms
} from "./nomsPrenoms/PrenomsForm";
import "./scss/ParentForm.scss";

// Valeurs par défaut des champs
export const ParentFormDefaultValues = {
  [NOM_NAISSANCE]: "",
  [PRENOMS]: genererDefaultValuesPrenoms()
};

// Schéma de validation des champs
export const ParentFormValidationSchema = Yup.object().shape({
  [NOM_NAISSANCE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [PRENOMS]: creerValidationSchemaPrenom()
});

interface ParentFormProps {
  index?: number;
  nePasAfficherTitre?: boolean;
}

export type ParentSubFormProps = SubFormProps & ParentFormProps;

const ParentForm: React.FC<ParentSubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM_NAISSANCE);

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
      <PrenomsForm nom={withNamespace(props.nom, PRENOMS)} />
    </>
  );
};

export default connect<ParentFormProps & INomForm>(ParentForm);
