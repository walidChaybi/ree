import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Qualite } from "../../../../../../model/requete/enum/Qualite";
import { Requerant } from "../../../../../../model/requete/IRequerant";
import { getLibelle } from "../../../../../common/util/Utils";
import { RadioField } from "../../../../../common/widget/formulaire/champsSaisie/RadioField";
import { SousFormulaire } from "../../../../../common/widget/formulaire/SousFormulaire";
import {
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import {
  AUTRE_PROFESSIONNEL,
  INSTITUTI0NNEL,
  MANDATAIRE,
  PARTICULIER,
  TYPE_REQUERANT
} from "../../modelForm/ISaisirRequetePageModel";
import AutreProfessionnelForm, {
  AutreProfessionnelFormDefaultValues,
  AutreProfessionnelFormValidationSchema
} from "./autreProfessionnel/AutreProfessionnelForm";
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

export const TitulairesFormDefaultValues = {
  [TYPE_REQUERANT]: "TITULAIRE1",
  [MANDATAIRE]: MandataireFormDefaultValues,
  [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
  [PARTICULIER]: ParticulierFormDefaultValues,
  [AUTRE_PROFESSIONNEL]: AutreProfessionnelFormDefaultValues
};

// Schéma de validation des champs
export const RequerantFormValidationSchema = Yup.object()
  .shape({
    [TYPE_REQUERANT]: Yup.string(),
    [MANDATAIRE]: MandataireFormValidationSchema,
    [INSTITUTI0NNEL]: InstitutionnelFormValidationSchema,
    [PARTICULIER]: ParticulierFormValidationSchema,
    [AUTRE_PROFESSIONNEL]: AutreProfessionnelFormValidationSchema
  })
  .test("typeMandataireObligatoire", function (value, error) {
    const typeRequerant = value[TYPE_REQUERANT] as string;
    const mandataire = value[MANDATAIRE];

    const paramsError = {
      path: `${error.path}.mandataire.type`,
      message: getLibelle("La sélection d'un Type est obligatoire 1 ")
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
  })
  .test("natureAutreProfessionnelObligatoire", function (value, error) {
    const typeRequerant = value[TYPE_REQUERANT] as string;
    const autreProfessionnel = value[AUTRE_PROFESSIONNEL];

    const paramsError = {
      path: `${error.path}.autreProfessionnel.nature`,
      message: getLibelle("La saisie d'une Nature est obligatoire")
    };

    return typeRequerant === "AUTRE_PROFESSIONNEL" &&
      autreProfessionnel["nature"] == null
      ? this.createError(paramsError)
      : true;
  });

const RequerantForm: React.FC<SubFormProps> = props => {
  const typeRequerantWithNamespace = withNamespace(props.nom, TYPE_REQUERANT);
  const [requerantSousForm, setRequerantSousForm] = useState<string>();

  useEffect(() => {
    if (props.requete) {
      switch (props.requete.requerant.qualiteRequerant.qualite) {
        case Qualite.MANDATAIRE_HABILITE:
          setRequerantSousForm("MANDATAIRE");
          break;
        case Qualite.PARTICULIER:
          if (
            props.requete.titulaires &&
            !Requerant.estInteresse(
              props.requete.requerant,
              props.requete.titulaires[0]
            )
          ) {
            setRequerantSousForm("PARTICULIER");
          }
          break;
        default:
          setRequerantSousForm(
            props.requete.requerant.qualiteRequerant.qualite.nom
          );
      }
    }
  }, [props.requete]);

  const mandataireFromProps = {
    nom: withNamespace(props.nom, MANDATAIRE)
  } as SubFormProps;

  const institutionnelFromProps = {
    nom: withNamespace(props.nom, INSTITUTI0NNEL)
  } as SubFormProps;

  const particulierFromProps = {
    nom: withNamespace(props.nom, PARTICULIER)
  } as SubFormProps;

  const autreProfessionnelFromProps = {
    nom: withNamespace(props.nom, AUTRE_PROFESSIONNEL)
  } as SubFormProps;

  const onChangeRequerant = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
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
    props.formik.setFieldValue(
      withNamespace(props.nom, AUTRE_PROFESSIONNEL),
      AutreProfessionnelFormDefaultValues
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
            values={props.options ? props.options : []}
            onChange={e => {
              onChangeRequerant(e);
            }}
          />
          {requerantSousForm === "PARTICULIER" && (
            <ParticulierForm {...particulierFromProps} />
          )}
          {requerantSousForm === "MANDATAIRE" && (
            <MandataireForm {...mandataireFromProps} />
          )}
          {requerantSousForm === "INSTITUTIONNEL" && (
            <InstitutionnelForm {...institutionnelFromProps} />
          )}
          {requerantSousForm === "AUTRE_PROFESSIONNEL" && (
            <AutreProfessionnelForm {...autreProfessionnelFromProps} />
          )}
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(RequerantForm);
