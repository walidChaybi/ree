import {
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  PAS_DE_NOM_ACTE_ETRANGER
} from "@pages/requeteCreation/saisirRequete/modelForm/ISaisirRCTCPageModel";
import { getLibelle } from "@util/Utils";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import {
  CENT_CARACT_MAX,
  INomForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../../ressources/Regex";
import "./scss/NomsForm.scss";

// Valeurs par défaut des champs
export const NomsFormDefaultValues = {
  [PAS_DE_NOM_ACTE_ETRANGER]: "false",
  [NOM_ACTE_ETRANGER]: "",
  [NOM_SOUHAITE_ACTE_FR]: ""
};

// Schéma de validation des champs
export const NomsFormValidationSchema = Yup.object()
  .shape({
    [NOM_ACTE_ETRANGER]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [NOM_SOUHAITE_ACTE_FR]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    )
  })
  .test("titulaire.pasDeNomActeEtranger", function (value, error) {
    const nomActeEtranger = value[NOM_ACTE_ETRANGER] as string;
    const pasDeNomActeEtrangerCoche = value[PAS_DE_NOM_ACTE_ETRANGER];

    const paramsError = {
      path: `${error.path}.nomActeEtranger`,
      message: getLibelle("La saisie d'un nom est obligatoire")
    };
    return pasDeNomActeEtrangerCoche === "false" && !nomActeEtranger
      ? this.createError(paramsError)
      : true;
  });

interface INomsFormProps {
  onBlurNom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type NomsFormProps = SubFormProps & INomsFormProps;

const NomsFormTitulaire: React.FC<NomsFormProps> = props => {
  const [pasDeNomActeEtranger, setPasDeNomActeEtranger] = useState(false);
  const pasDeNomActeEtrangerWithNameSpace = withNamespace(
    props.nom,
    PAS_DE_NOM_ACTE_ETRANGER
  );
  const nomSurActeWithNamespace = withNamespace(props.nom, NOM_ACTE_ETRANGER);
  const nomSouhaiteWithNamespace = withNamespace(
    props.nom,
    NOM_SOUHAITE_ACTE_FR
  );

  function onChangePasDeNomSurActeEtranger(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.checked) {
      setPasDeNomActeEtranger(true);
      props.formik.setFieldValue(nomSurActeWithNamespace, "");
    } else {
      setPasDeNomActeEtranger(false);
    }
    props.formik.handleChange(e);
  }

  return (
    <>
      <div className="NomsFormTitulaire">
        <CheckboxField
          name={pasDeNomActeEtrangerWithNameSpace}
          label={getLibelle("Le titulaire n'a pas de nom sur l'acte étranger")}
          values={[{ str: "", value: PAS_DE_NOM_ACTE_ETRANGER }]}
          onChange={onChangePasDeNomSurActeEtranger}
        />
        <InputField
          name={nomSurActeWithNamespace}
          label={getLibelle("Nom sur l'acte étranger")}
          maxLength={CENT_CARACT_MAX}
          disabled={pasDeNomActeEtranger}
          onBlur={props.onBlurNom}
        />
        <InputField
          name={nomSouhaiteWithNamespace}
          label={getLibelle("Nom souhaité sur l'acte français")}
          maxLength={CENT_CARACT_MAX}
        />
      </div>
    </>
  );
};

export default connect<INomsFormProps & INomForm>(NomsFormTitulaire);
