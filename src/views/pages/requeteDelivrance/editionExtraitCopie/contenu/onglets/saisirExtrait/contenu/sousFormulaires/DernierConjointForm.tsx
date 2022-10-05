import {
  NOM_NAISSANCE,
  PRENOMS
} from "@composant/formulaire/ConstantesNomsForm";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import "./scss/DernierConjointForm.scss";

interface DernierConjointFormProps {
  nom: string;
}

export const DernierConjointForm: React.FC<
  DernierConjointFormProps
> = props => {
  return (
    <div className="DernierConjointForm">
      <InputField
        label="Nom de naissance"
        name={withNamespace(props.nom, NOM_NAISSANCE)}
      />

      <InputField label="Prénom(s)" name={withNamespace(props.nom, PRENOMS)} />
    </div>
  );
};
