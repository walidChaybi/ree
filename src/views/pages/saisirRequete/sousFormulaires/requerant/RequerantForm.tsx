import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { TypeRequerant } from "../../../../../model/requete/v2/enum/TypeRequerant";
import { RadioField } from "../../../../common/widget/formulaire/champsSaisie/RadioField";
import { SousFormulaire } from "../../../../common/widget/formulaire/SousFormulaire";
import {
  SubFormProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import {
  INSTITUTI0NNEL,
  MANDATAIRE,
  PARTICULIER,
  TYPE_REQUERANT
} from "../../modelForm/ISaisirRDCSCPageModel";
import InstitutionnelForm, {
  InstitutionnelFormDefaultValues,
  InstitutionnelFormValidationSchema
} from "./institutionnel/InstitutionnelForm";
import MandataireForm, {
  MandataireFormDefaultValues,
  MandataireFormValidationSchema
} from "./mandataire/MandataireForm";
import ParticulierForm, {
  ParticulierFormDefaultValues,
  ParticulierFormValidationSchema
} from "./particulier/ParticulierForm";
import "./scss/RequerantForm.scss";

// Valeurs par défaut des champs
export const RequerantFormDefaultValues = {
  [TYPE_REQUERANT]: "INTERESSE",
  [MANDATAIRE]: MandataireFormDefaultValues,
  [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
  [PARTICULIER]: ParticulierFormDefaultValues
};

// Valeurs par défaut des champs
export const PartenairesFormDefaultValues = {
  [TYPE_REQUERANT]: "PARTENAIRE1",
  [MANDATAIRE]: MandataireFormDefaultValues,
  [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
  [PARTICULIER]: ParticulierFormDefaultValues
};

// Schéma de validation des champs
export const RequerantFormValidationSchema = Yup.object()
  .shape({
    [TYPE_REQUERANT]: Yup.string(),
    [MANDATAIRE]: MandataireFormValidationSchema,
    [INSTITUTI0NNEL]: InstitutionnelFormValidationSchema,
    [PARTICULIER]: ParticulierFormValidationSchema
  })
  .test("typeMandataireObligatoire", function (value, error) {
    const typeRequerant = value[TYPE_REQUERANT] as string;
    const mandataire = value[MANDATAIRE];

    const paramsError = {
      path: `${error.path}.mandataire.type`,
      message: getLibelle("La sélection d'un Type est obligatoire")
    };

    return typeRequerant === "MANDATAIRE" && mandataire["type"] == null
      ? this.createError(paramsError)
      : true;
  })
  .test("typeInstitutionnelObligatoire", function (value, error) {
    const typeRequerant = value[TYPE_REQUERANT] as string;
    const institutionnel = value[INSTITUTI0NNEL];

    const paramsError = {
      path: `${error.path}.institutionnel.type`,
      message: getLibelle("La sélection d'un Type est obligatoire")
    };

    return typeRequerant === "INSTITUTIONNEL" && institutionnel["type"] == null
      ? this.createError(paramsError)
      : true;
  });

const RequerantForm: React.FC<SubFormProps> = props => {
  const typeRequerantWithNamespace = withNamespace(props.nom, TYPE_REQUERANT);
  const [requerantSousForm, setRequerantSousForm] = useState<string>();

  const mandataireFromProps = {
    nom: withNamespace(props.nom, MANDATAIRE)
  } as SubFormProps;

  const institutionnelFromProps = {
    nom: withNamespace(props.nom, INSTITUTI0NNEL)
  } as SubFormProps;

  const particulierFromProps = {
    nom: withNamespace(props.nom, PARTICULIER)
  } as SubFormProps;

  const onChangeRequerant = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.formik.setFieldValue(typeRequerantWithNamespace, e.target.value);
    props.formik.setFieldValue(
      withNamespace(props.nom, MANDATAIRE),
      MandataireFormDefaultValues
    );
    props.formik.setFieldValue(
      withNamespace(props.nom, INSTITUTI0NNEL),
      InstitutionnelFormDefaultValues
    );
    props.formik.setFieldValue(
      withNamespace(props.nom, PARTICULIER),
      ParticulierFormDefaultValues
    );

    setRequerantSousForm(e.target.value);
    props.formik.handleChange(e);
  };

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="RequerantForm">
          <RadioField
            name={typeRequerantWithNamespace}
            label={getLibelle("Requérant")}
            values={props.type}
            onChange={e => {
              onChangeRequerant(e);
            }}
          />
          {requerantSousForm === "MANDATAIRE" && (
            <MandataireForm {...mandataireFromProps} />
          )}
          {requerantSousForm === "INSTITUTIONNEL" && (
            <InstitutionnelForm {...institutionnelFromProps} />
          )}
          {requerantSousForm === "PARTICULIER" && (
            <ParticulierForm {...particulierFromProps} />
          )}
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(RequerantForm);
