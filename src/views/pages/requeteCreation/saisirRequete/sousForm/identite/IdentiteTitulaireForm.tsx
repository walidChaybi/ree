import {
  DATE_NAISSANCE,
  LIEN_REQUERANT,
  NAISSANCE,
  NATURE_ACTE_LIEN_REQUERANT,
  NOM,
  NOMS,
  NOM_ACTE_ETRANGER,
  PAS_DE_PRENOM_CONNU,
  PRENOM,
  PRENOMS,
  PRENOM_1,
  REQUERANT,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import PrenomsForm, {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { getLibelle } from "@util/Utils";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues
} from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import {
  ISubForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import EvenementEtrangerForm, {
  EvenementEtrangerFormDefaultValues,
  EvenementEtrangerFormValidationSchema
} from "../evenement/EvenementEtranger";
import NomsFormTitulaire, {
  NomsFormDefaultValues,
  NomsFormValidationSchema
} from "./nomsPrenoms/NomsForm";
import "./scss/IdentiteTitulaireForm.scss";

export const IdentiteFormDefaultValues = {
  [NOMS]: NomsFormDefaultValues,
  [PAS_DE_PRENOM_CONNU]: "false",
  [PRENOMS]: PrenomsFormDefaultValues,
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementEtrangerFormDefaultValues
};

// Schéma de validation des champs
export const IdentiteFormValidationSchema = Yup.object()
  .shape({
    [NOMS]: NomsFormValidationSchema,
    [PRENOMS]: PrenomsFormValidationSchema,
    [SEXE]: Yup.string(),
    [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
    [NAISSANCE]: EvenementEtrangerFormValidationSchema
  })
  .test("titulaire.pasDePrenomConnu", function (value, error) {
    const prenom1 = value[PRENOMS].prenom1 as string;
    const pasDePrenomConnuCoche = value[PAS_DE_PRENOM_CONNU];

    const paramsError = {
      path: `${error.path}.prenoms.prenom1`,
      message: getLibelle("La saisie d'un prénom est obligatoire")
    };
    return pasDePrenomConnuCoche === "false" && !prenom1
      ? this.createError(paramsError)
      : true;
  });

const IdentiteTitulaireForm: React.FC<SubFormProps> = props => {
  const [pasDePrenomConnu, setPasDePrenomConnu] = useState(false);

  const dateEvenementComposeFormProps = {
    labelDate: getLibelle(`Date de naissance`),
    nomDate: withNamespace(props.nom, DATE_NAISSANCE),
    anneeMax: new Date().getFullYear()
  } as DateComposeFormProps;

  function onChangePasDePrenomConnu(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPasDePrenomConnu(true);
      reinitialiserPrenoms();
      props.formik.handleChange(e);
    } else {
      setPasDePrenomConnu(false);
      props.formik.handleChange(e);
      props.formik.setFieldValue(
        withNamespace(props.nom, PAS_DE_PRENOM_CONNU),
        "false"
      );
    }
  }

  function reinitialiserPrenoms() {
    const pathPrenomsAReinitialiser = `${props.nom}.prenoms`;
    props.formik.setFieldValue(
      pathPrenomsAReinitialiser,
      PrenomsFormDefaultValues
    );
  }

  function getLienRequerant(): TypeLienRequerantCreation {
    return TypeLienRequerantCreation.getEnumFor(
      props.formik.getFieldProps(
        withNamespace(NATURE_ACTE_LIEN_REQUERANT, LIEN_REQUERANT)
      ).value
    );
  }

  function handleNomActeEtranger(e: React.ChangeEvent<HTMLInputElement>) {
    const lienRequerant = getLienRequerant();
    const nomTitulaireWithNameSpace = withNamespace(props.nom, NOMS);

    if (
      TypeLienRequerantCreation.estTitulaireActeOuTitulaireActeMineureEmancipe(
        lienRequerant
      )
    ) {
      const nomTitulaire = props.formik.getFieldProps(
        withNamespace(nomTitulaireWithNameSpace, NOM_ACTE_ETRANGER)
      ).value;
      props.formik.setFieldValue(withNamespace(REQUERANT, NOM), nomTitulaire);
    }

    props.formik.handleChange(e);
  }

  function handleBlurPrenom1(e: React.ChangeEvent<HTMLInputElement>) {
    const lienRequerant = getLienRequerant();
    const prenomTitulaireWithNameSpace = withNamespace(props.nom, PRENOMS);

    if (
      TypeLienRequerantCreation.estTitulaireActeOuTitulaireActeMineureEmancipe(
        lienRequerant
      )
    ) {
      const prenom1Titulaire = props.formik.getFieldProps(
        withNamespace(prenomTitulaireWithNameSpace, PRENOM_1)
      ).value;
      props.formik.setFieldValue(
        withNamespace(REQUERANT, PRENOM),
        prenom1Titulaire
      );
    }

    props.formik.handleChange(e);
  }

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="IdentiteTitulaireForm">
          <NomsFormTitulaire
            nom={withNamespace(props.nom, NOMS)}
            onBlurNom={e => handleNomActeEtranger(e)}
          />

          <CheckboxField
            name={withNamespace(props.nom, PAS_DE_PRENOM_CONNU)}
            label={getLibelle("Pas de prénom connu")}
            values={[{ str: "", value: PAS_DE_PRENOM_CONNU }]}
            onChange={e => onChangePasDePrenomConnu(e)}
          />

          {!pasDePrenomConnu && (
            <PrenomsForm
              nom={withNamespace(props.nom, PRENOMS)}
              onBlurPrenom={handleBlurPrenom1}
            />
          )}

          <RadioField
            name={withNamespace(props.nom, SEXE)}
            label={getLibelle("Sexe")}
            values={Sexe.getAllEnumsAsOptionsSansInconnu()}
          />

          <div className="Date">
            <div className="DateEvenement">
              <DateComposeForm
                {...dateEvenementComposeFormProps}
              ></DateComposeForm>
            </div>
          </div>

          <EvenementEtrangerForm nom={withNamespace(props.nom, NAISSANCE)} />
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect<ISubForm>(IdentiteTitulaireForm);
