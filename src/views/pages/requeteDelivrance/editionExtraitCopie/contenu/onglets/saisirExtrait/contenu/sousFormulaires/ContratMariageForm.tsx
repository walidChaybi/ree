import { EXISTENCE, TEXTE } from "@composant/formulaire/ConstantesNomsForm";
import { ExistenceContratMariage } from "@model/etatcivil/enum/ExistenceContratMariage";
import { getLibelle, TROIS } from "@util/Utils";
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
        label={getLibelle("Contrat de mariage")}
        options={ExistenceContratMariage.getAllEnumsAsOptions()}
      />
      <InputField
        name={withNamespace(props.nom, TEXTE)}
        label={getLibelle(" ")}
        component={"textarea"}
        rows={TROIS}
      />
    </div>
  );
};
