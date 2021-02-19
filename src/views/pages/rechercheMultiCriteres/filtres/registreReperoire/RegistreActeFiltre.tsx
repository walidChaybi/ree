import React from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../common/widget/formulaire/champsSaisie/SelectField";
import { CodeFamilleRegistre } from "../../../../../model/etatcivil/enum/CodeFamilleRegistre";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";

// Noms des champs
export const NATURE_ACTE = "natureActe";
export const FAMILLE_REGISTRE = "familleRegistre";
export const POCOPA = "pocopa";
export const NUMERO_ACTE = "numeroActe";

// Valeurs par défaut des champs
export const RegistreActeDefaultValues = {
  [NATURE_ACTE]: "",
  [FAMILLE_REGISTRE]: "",
  [POCOPA]: "",
  [NUMERO_ACTE]: ""
};

// Schéma de validation des champs
export const RegistreActeValidationSchema = Yup.object({
  [NATURE_ACTE]: Yup.string(),
  [FAMILLE_REGISTRE]: Yup.string(),
  [POCOPA]: Yup.string(),
  [NUMERO_ACTE]: Yup.string()
});

export const RegistreActeFiltre: React.FC<ComponentFiltreProps> = props => {
  const pocopaWithNamespace = withNamespace(props.nomFiltre, POCOPA);
  const numeroActeWithNamespace = withNamespace(props.nomFiltre, NUMERO_ACTE);
  const familleRegistreWithNamespace = withNamespace(
    props.nomFiltre,
    FAMILLE_REGISTRE
  );
  const natureActeWithNamespace = withNamespace(props.nomFiltre, NATURE_ACTE);
  return (
    <>
      <SelectField
        name={natureActeWithNamespace}
        label={getLibelle("Nature de l'acte")}
        options={NatureActe.getAllEnumsAsOptions()}
      />
      <SelectField
        name={familleRegistreWithNamespace}
        label={getLibelle("N° de l'acte")}
        options={CodeFamilleRegistre.getAllEnumsAsOptions()}
      />
      <InputField
        name={pocopaWithNamespace}
        label={getLibelle("Poste/POCOPA")}
      />
      <InputField
        name={numeroActeWithNamespace}
        label={getLibelle("N° de l'acte")}
      />
    </>
  );
};
