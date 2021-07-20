import { connect, FormikValues, getIn } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { NatureRc } from "../../../../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../../../../model/etatcivil/enum/NatureRca";
import { TypeRepertoire } from "../../../../../model/etatcivil/enum/TypeRepertoire";
import {
  CarateresAutorise,
  NumeroInscription
} from "../../../../../ressources/Regex";
import { Options } from "../../../../common/util/Type";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../common/widget/formulaire/champsSaisie/SelectField";
import {
  CARATERES_AUTORISES_MESSAGE,
  NUMERO_INSCRIPTION_MESSAGE
} from "../../../../common/widget/formulaire/FormulaireMessages";
import { traiteEspace } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";

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
    .matches(NumeroInscription, NUMERO_INSCRIPTION_MESSAGE)
    .matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [TYPE_REPERTOIRE]: Yup.string(),
  [NATURE_INSCRIPTION]: Yup.string()
});

interface TypeRepertoireInputProps {
  filtreTypeRepertoire?: TypeRepertoire;
}

export type RepertoireInscriptionFiltreProps = TypeRepertoireInputProps &
  ComponentFiltreProps &
  FormikComponentProps;

const RepertoireInscriptionFiltre: React.FC<RepertoireInscriptionFiltreProps> = props => {
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

  const [natureInactif, setNatureInactif] = useState<boolean>(true);
  const [natureOptions, setNatureOptions] = useState<Options>([]);

  const onBlurNumero = (e: any) => {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  };

  const manageNatureOptions = async (type: string) => {
    if (type === "RC") {
      setNatureOptions(NatureRc.getAllEnumsAsOptions());
    } else if (type === "RCA") {
      setNatureOptions(NatureRca.getAllEnumsAsOptions());
    } else {
      setNatureOptions([]);
    }
  };

  const onChangeTypeRepertoire = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.formik.setFieldValue(natureInscriptionWithNamespace, "");
    manageNatureOptions(e.target.value);
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

  // Permet de dégriser ou griser le champs Nature inscription apres un resetForm ou un rappelCriteres
  useEffect(() => {
    setNatureInactif(isTypeRepDirty(props.formik.values, props.nomFiltre));
    const type = getIn(
      props.formik.values,
      withNamespace(props.nomFiltre, TYPE_REPERTOIRE)
    );
    manageNatureOptions(type);
  }, [props.formik.dirty, props.formik.values, props.nomFiltre]);

  return (
    <>
      <InputField
        name={numeroInscriptionWithNamespace}
        label={getLibelle("N° de l'inscription")}
        onInput={formatNumber}
        disabled={props.filtreInactif}
        onBlur={onBlurNumero}
      />
      <SelectField
        name={typeRepertoireWithNamespace}
        label={getLibelle("Type de répertoire")}
        options={TypeRepertoire.getAllEnumsAsOptions().filter(el => {
          return props.filtreTypeRepertoire
            ? el.value === props.filtreTypeRepertoire.libelle
            : true;
        })}
        onChange={e => {
          onChangeTypeRepertoire(e);
        }}
        disabled={props.filtreInactif}
      />
      <SelectField
        name={natureInscriptionWithNamespace}
        label={getLibelle("Nature de l'inscription")}
        options={natureOptions}
        disabled={natureInactif || props.filtreInactif}
      />
    </>
  );
};

export default connect(RepertoireInscriptionFiltre);

function isTypeRepDirty(values: FormikValues, nomFiltre: string) {
  const typeRep = getIn(values, withNamespace(nomFiltre, TYPE_REPERTOIRE));
  return typeRep === "" || typeRep === "PACS";
}
