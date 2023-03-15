import {
  LIEN_REQUERANT,
  NATURE_ACTE
} from "@composant/formulaire/ConstantesNomsForm";
import { NatureActeTranscrit } from "@model/requete/enum/NatureActeTranscrit";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { getLibelle } from "@util/Utils";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import {
  LIEN_REQUERANT_OBLIGATOIRE,
  NATURE_ACTE_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import {
  ISubForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import "./scss/NatureActeEtLienRequerant.scss";

export const NatureActeEtLienRequerantFormDefaultValues = {
  [NATURE_ACTE]: "",
  [LIEN_REQUERANT]: ""
};

// Schéma de validation des champs
export const NatureActeEtLienRequerantFormValidationSchema = Yup.object().shape(
  {
    [NATURE_ACTE]: Yup.string().required(NATURE_ACTE_OBLIGATOIRE),
    [LIEN_REQUERANT]: Yup.string().required(LIEN_REQUERANT_OBLIGATOIRE)
  }
);

const NatureActeEtLienRequerantForm: React.FC<SubFormProps> = props => {
  return (
    <>
      <div className="NatureActeEtLienRequerant">
        <SelectField
          name={withNamespace(props.nom, NATURE_ACTE)}
          label={getLibelle("Acte à transcrire")}
          options={NatureActeTranscrit.getAllEnumsAsOptions()}
        />
        <SelectField
          name={withNamespace(props.nom, LIEN_REQUERANT)}
          label={getLibelle("Lien entre requérant et titulaire")}
          options={TypeLienRequerantCreation.getAllEnumsAsOptions()}
        />
      </div>
    </>
  );
};

export default connect<ISubForm>(NatureActeEtLienRequerantForm);
