import React from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace,
  FormikComponentProps,
  isDirty
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../common/widget/formulaire/champsSaisie/SelectField";
import { CodeFamilleRegistre } from "../../../../../model/etatcivil/enum/CodeFamilleRegistre";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { connect } from "formik";

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

export type RegistreActeFiltreProps = ComponentFiltreProps &
  FormikComponentProps;

const RegistreActeFiltre: React.FC<RegistreActeFiltreProps> = props => {
  const pocopaWithNamespace = withNamespace(props.nomFiltre, POCOPA);
  const numeroActeWithNamespace = withNamespace(props.nomFiltre, NUMERO_ACTE);
  const familleRegistreWithNamespace = withNamespace(
    props.nomFiltre,
    FAMILLE_REGISTRE
  );
  const natureActeWithNamespace = withNamespace(props.nomFiltre, NATURE_ACTE);

  function onFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onFieldChange) {
      props.onFieldChange({
        filtreDirty: isDirty(
          e.target.value,
          e.target.name,
          props.formik.values,
          [
            natureActeWithNamespace,
            familleRegistreWithNamespace,
            pocopaWithNamespace,
            numeroActeWithNamespace
          ]
        )
      });
    }
    props.formik.handleChange(e);
  }

  return (
    <>
      <SelectField
        name={natureActeWithNamespace}
        label={getLibelle("Nature de l'acte")}
        options={NatureActe.getAllEnumsAsOptions()}
        disabled={props.filtreInactif}
        onChange={onFieldChange}
      />
      <SelectField
        name={familleRegistreWithNamespace}
        label={getLibelle("Famille de registre")}
        options={CodeFamilleRegistre.getAllEnumsAsOptions()}
        disabled={props.filtreInactif}
        onChange={onFieldChange}
      />
      <InputField
        name={pocopaWithNamespace}
        label={getLibelle("Poste/POCOPA")}
        disabled={props.filtreInactif}
        onChange={onFieldChange}
      />
      <InputField
        name={numeroActeWithNamespace}
        label={getLibelle("N° de l'acte")}
        disabled={props.filtreInactif}
        onChange={onFieldChange}
      />
    </>
  );
};

export default connect(RegistreActeFiltre);
