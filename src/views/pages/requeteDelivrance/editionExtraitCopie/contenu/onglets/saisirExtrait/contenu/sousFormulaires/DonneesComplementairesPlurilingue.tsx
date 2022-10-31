import {
  NOM_APRES_MARIAGE_EPOUSE,
  NOM_APRES_MARIAGE_EPOUX
} from "@composant/formulaire/ConstantesNomsForm";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import "./scss/DonneesComplementairesPlurilingue.scss";

interface DonneesComplementairesPlurilingueProps {
  nom: string;
}

export const DonneesComplementairesPlurilingue: React.FC<
  DonneesComplementairesPlurilingueProps
> = props => {
  return (
    <div className="DonneesComplementairesPlurilingue">
      <InputField
        label="Nom après mariage de l'époux"
        name={withNamespace(props.nom, NOM_APRES_MARIAGE_EPOUX)}
      />

      <InputField
        label="Nom après mariage de l'épouse"
        name={withNamespace(props.nom, NOM_APRES_MARIAGE_EPOUSE)}
      />
    </div>
  );
};
