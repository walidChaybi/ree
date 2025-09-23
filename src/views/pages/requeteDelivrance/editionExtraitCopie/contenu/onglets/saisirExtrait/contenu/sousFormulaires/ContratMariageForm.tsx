import { EXISTENCE, TEXTE } from "@composant/formulaire/ConstantesNomsForm";
import EExistenceContratMariage from "@model/etatcivil/enum/EExistenceContratMariage";
import { enumVersOptions, TROIS } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import "./scss/ContratMariageForm.scss";

interface ContratMariageFormProps {
  nom: string;
}

export const ContratMariageForm: React.FC<ContratMariageFormProps> = props => {
  return (
    <div className="ContratMariageForm">
      <SelectField
        name={withNamespace(props.nom, EXISTENCE)}
        label={"Contrat de mariage"}
        options={enumVersOptions(EExistenceContratMariage)}
      />
      <InputField
        name={withNamespace(props.nom, TEXTE)}
        label={" "}
        component={"textarea"}
        rows={TROIS}
      />
    </div>
  );
};
