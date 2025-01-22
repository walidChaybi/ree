import { LIEN_REQUERANT, NATURE_ACTE } from "@composant/formulaire/ConstantesNomsForm";
import { NatureActeTranscrit } from "@model/requete/enum/NatureActeTranscrit";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect } from "react";

const NatureActeEtLienRequerantForm: React.FC<SubFormProps> = ({ nom, formik }) => {
  useEffect(() => {
    if (!formik.values[withNamespace(nom, NATURE_ACTE)]) {
      formik.setFieldValue(withNamespace(nom, NATURE_ACTE), NatureActeTranscrit.getKey(NatureActeTranscrit.NAISSANCE_MINEUR));
    }
  }, []);

  return (
    <div className="NatureActeEtLienRequerant">
      <SelectField
        name={withNamespace(nom, NATURE_ACTE)}
        label={"Acte à transcrire"}
        options={NatureActeTranscrit.getAllEnumsAsOptions()}
      />
      <SelectField
        name={withNamespace(nom, LIEN_REQUERANT)}
        label={"Requérant"}
        options={TypeLienRequerantCreation.getAllEnumsAsOptions()}
      />
    </div>
  );
};

export default connect<ISubForm>(NatureActeEtLienRequerantForm);
