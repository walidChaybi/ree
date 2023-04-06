import {
  LIEN_REQUERANT,
  NATURE_ACTE
} from "@composant/formulaire/ConstantesNomsForm";
import { NatureActeTranscrit } from "@model/requete/enum/NatureActeTranscrit";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { getLibelle } from "@util/Utils";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import {
  ISubForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";

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
          label={getLibelle("Requérant")}
          options={TypeLienRequerantCreation.getAllEnumsAsOptions()}
        />
      </div>
    </>
  );
};

export default connect<ISubForm>(NatureActeEtLienRequerantForm);
