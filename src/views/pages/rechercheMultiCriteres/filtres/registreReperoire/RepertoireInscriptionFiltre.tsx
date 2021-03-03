import React, { useState } from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace,
  isDirty
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../common/widget/formulaire/champsSaisie/SelectField";
import { TypeRepertoire } from "../../../../../model/etatcivil/enum/TypeRepertoire";
import { NatureRca } from "../../../../../model/etatcivil/enum/NatureRca";
import { NatureRc } from "../../../../../model/etatcivil/enum/NatureRc";
import { Options } from "../../../../common/util/Type";
import { connect } from "formik";
import {
  CarateresAutorise,
  numeroInscription
} from "../../../../../ressources/Regex";
import {
  CARATERES_AUTORISES_MESSAGE,
  NUMERO_INSCRIPTION_MESSAGE
} from "../../../../common/widget/formulaire/FormulaireMessages";
import { useEffect } from "react";

// Noms des champs
export const NUMERO_INSCRIPTION = "numeroInscription";
export const TYPE_REPERTOIRE = "typeRepertoire";
export const NATURE_INSCRIPTION = "natureInscription";

// Valeurs par défaut des champs
export const RepertoireInscriptionDefaultValues = {
  [NUMERO_INSCRIPTION]: "",
  [TYPE_REPERTOIRE]: "",
  [NATURE_INSCRIPTION]: ""
};

// Schéma de validation des champs
export const RepertoireInscriptionValidationSchema = Yup.object({
  [NUMERO_INSCRIPTION]: Yup.string()
    .matches(numeroInscription, NUMERO_INSCRIPTION_MESSAGE)
    .matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [TYPE_REPERTOIRE]: Yup.string(),
  [NATURE_INSCRIPTION]: Yup.string()
});

export type ComponentFiltreInscriptionProps = ComponentFiltreProps &
  FormikComponentProps;

const RepertoireInscriptionFiltre: React.FC<ComponentFiltreInscriptionProps> = props => {
  const numeroInscriptionWithNamespace = withNamespace(
    props.nomFiltre,
    NUMERO_INSCRIPTION
  );
  const typeRepertoireWithNamespace = withNamespace(
    props.nomFiltre,
    TYPE_REPERTOIRE
  );
  const natureInscriptionWithNamespace = withNamespace(
    props.nomFiltre,
    NATURE_INSCRIPTION
  );

  const [natureDisabled, setNatureDisabled] = useState<boolean>(true);
  const [natureOptions, setNatureOptions] = useState<Options>([]);

  const manageNatureOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.formik.setFieldValue(natureInscriptionWithNamespace, "");
    if (e.target.value === "RC") {
      setNatureDisabled(false);
      setNatureOptions(NatureRc.getAllEnumsAsOptions());
    } else if (e.target.value === "RCA") {
      setNatureDisabled(false);
      setNatureOptions(NatureRca.getAllEnumsAsOptions());
    } else {
      setNatureDisabled(true);
      setNatureOptions([]);
    }
    props.formik.handleChange(e);
  };

  const limitChar = 4;

  const formatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (
      value.length === limitChar + 1 &&
      value.charAt(limitChar) !== "-" &&
      !value.includes("-")
    ) {
      e.target.value = `${value.slice(0, limitChar)}-${value.slice(limitChar)}`;
    }
  };

  useEffect(() => {
    if (!natureDisabled && !props.formik.dirty) {
      setNatureDisabled(true);
    }
  }, [props.formik.dirty, natureDisabled, setNatureDisabled]);

  function onFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (props.onFieldChange) {
      props.onFieldChange({
        filtreDirty: isDirty(
          e.target.value,
          e.target.name,
          props.formik.values,
          [numeroInscriptionWithNamespace, typeRepertoireWithNamespace]
        )
      });
    }
    props.formik.handleChange(e);
  }

  return (
    <>
      <InputField
        name={numeroInscriptionWithNamespace}
        label={getLibelle("N° de l'inscription")}
        onInput={formatNumber}
        disabled={props.filtreInactif}
        onChange={onFieldChange}
      />
      <SelectField
        name={typeRepertoireWithNamespace}
        label={getLibelle("Type de répertoire")}
        options={TypeRepertoire.getAllEnumsAsOptions()}
        onChange={e => {
          manageNatureOptions(e);
          onFieldChange(e);
        }}
        disabled={props.filtreInactif}
      />
      <SelectField
        name={natureInscriptionWithNamespace}
        label={getLibelle("Nature de l'inscription")}
        options={natureOptions}
        disabled={natureDisabled || props.filtreInactif}
        onChange={onFieldChange}
      />
    </>
  );
};

export default connect(RepertoireInscriptionFiltre);
