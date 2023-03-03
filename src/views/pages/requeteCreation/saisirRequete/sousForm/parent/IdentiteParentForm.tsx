import PrenomsForm, {
  PrenomsFormProps
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IParent } from "@model/requete/IParents";
import { getLibelle } from "@util/Utils";
import DateComposeForm, {
  DateComposeFormProps
} from "@widget/formulaire/champsDate/DateComposeForm";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import NationalitesForm, {
  NationalitesFormProps
} from "@widget/formulaire/nationalites/Nationalites";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import {
  ISubForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import {
  DATE_NAISSANCE,
  NAISSANCE,
  NATIONALITES,
  NOM,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU,
  PAYS_ORIGINE_REGUGIE,
  PAYS_STATUT_REGUGIE,
  PRENOMS,
  SEXE
} from "../../modelForm/ISaisirRCTCPageModel";
import EvenementParentForm from "../evenement/EvenementParentsForm";
import "./scss/ParentsForm.scss";
interface ComponentFormProps {
  parent?: IParent;
}

export type ParentSubFormProps = SubFormProps & ComponentFormProps;

const IdentiteParentForm: React.FC<ParentSubFormProps> = props => {
  const [pasDePrenomConnu, setPasDePrenomConnu] = useState(false);
  const [pasDeNomConnu, setPasDeNomConnu] = useState(false);

  const paysStatutRefugieWithNamespace = withNamespace(
    props.nom,
    PAYS_STATUT_REGUGIE
  );

  const paysOrigineRefugieWithNamespace = withNamespace(
    props.nom,
    PAYS_ORIGINE_REGUGIE
  );

  const prenomsFormProps = {
    nom: withNamespace(props.nom, PRENOMS),
    prenoms: props.parent ? props.parent.prenoms : undefined
  } as PrenomsFormProps;

  const nationaliteFormProps = {
    nom: withNamespace(props.nom, NATIONALITES),
    nationalites: undefined
  } as NationalitesFormProps;

  const dateEvenementComposeFormProps = {
    labelDate: getLibelle(`Date de naissance`),
    nomDate: withNamespace(props.nom, DATE_NAISSANCE),
    anneeMax: new Date().getFullYear()
  } as DateComposeFormProps;

  function onChangePasDePrenomConnu(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPasDePrenomConnu(true);
      reinitialiserPrenoms();
    } else {
      setPasDePrenomConnu(false);
      reinitialiserPrenoms();
    }
    props.formik.handleChange(e);
  }

  function reinitialiserPrenoms() {
    const prenomsParentsCourant = props.formik.getFieldProps(
      withNamespace(props.nom, PRENOMS)
    ).value;

    const keysPrenoms = Object.keys(prenomsParentsCourant);
    keysPrenoms.forEach(prenom => {
      props.formik.setFieldValue(
        withNamespace(withNamespace(props.nom, PRENOMS), prenom),
        ""
      );
    });
  }

  function onChangePasDeNomConnu(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPasDeNomConnu(true);
      props.formik.setFieldValue(withNamespace(props.nom, NOM), "");
    } else {
      setPasDeNomConnu(false);
    }
    props.formik.handleChange(e);
  }

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="IdentiteParentsForm">
          <CheckboxField
            name={withNamespace(props.nom, PAS_DE_NOM_CONNU)}
            label={getLibelle("Le parent n'a pas de nom connu")}
            values={[{ str: "", value: PAS_DE_NOM_CONNU }]}
            onChange={onChangePasDeNomConnu}
          />

          <InputField
            name={withNamespace(props.nom, NOM)}
            label={getLibelle("Nom")}
            maxLength={NB_CARACT_MAX_SAISIE}
            disabled={pasDeNomConnu}
          />

          <CheckboxField
            name={withNamespace(props.nom, PAS_DE_PRENOM_CONNU)}
            label={getLibelle("Pas de prénom connu")}
            values={[{ str: "", value: PAS_DE_PRENOM_CONNU }]}
            onChange={e => onChangePasDePrenomConnu(e)}
          />

          {!pasDePrenomConnu && <PrenomsForm {...prenomsFormProps} />}

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

          <EvenementParentForm nom={withNamespace(props.nom, NAISSANCE)} />

          <NationalitesForm {...nationaliteFormProps} />

          <InputField
            name={paysStatutRefugieWithNamespace}
            label={getLibelle("Pays du statut de réfugié")}
            maxLength={NB_CARACT_MAX_SAISIE}
          />

          <InputField
            name={paysOrigineRefugieWithNamespace}
            label={getLibelle("Pays d'origine du réfugié")}
            maxLength={NB_CARACT_MAX_SAISIE}
          />
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect<ComponentFormProps & ISubForm>(IdentiteParentForm);
