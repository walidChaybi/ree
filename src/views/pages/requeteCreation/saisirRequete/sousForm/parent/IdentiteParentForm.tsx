import {
  NAISSANCE,
  NATIONALITES,
  NOM,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import PrenomsConnusForm from "@composant/formulaire/nomsPrenoms/PrenomsConnusForm";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { SNP, SPC, getLibelle } from "@util/Utils";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import DateComposeForm, {
  DateComposeFormProps
} from "@widget/formulaire/champsDate/DateComposeForm";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import NationalitesForm, {
  NationalitesFormProps
} from "@widget/formulaire/nationalites/NationalitesForm";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  ISubForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import {
  DATE_NAISSANCE,
  PAS_DE_NOM_CONNU,
  PAYS_ORIGINE,
  PAYS_STATUT_REFUGIE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import EvenementParentForm from "../evenement/EvenementParentsForm";
import "./scss/ParentsForm.scss";
interface ComponentFormProps {
  parent?: ITitulaireRequeteCreation;
  maxPrenoms: number;
}

export type ParentSubFormProps = SubFormProps & ComponentFormProps;

const IdentiteParentForm: React.FC<ParentSubFormProps> = props => {
  const [pasDeNomConnu, setPasDeNomConnu] = useState(false);

  const paysStatutRefugieWithNamespace = withNamespace(
    props.nom,
    PAYS_STATUT_REFUGIE
  );

  const paysOrigineRefugieWithNamespace = withNamespace(
    props.nom,
    PAYS_ORIGINE
  );

  const pasDeNomConnuWithNamespace = withNamespace(props.nom, PAS_DE_NOM_CONNU);

  const nationaliteFormProps = {
    nom: withNamespace(props.nom, NATIONALITES),
    nationalites: props.parent?.nationalites || undefined
  } as NationalitesFormProps;

  const dateEvenementComposeFormProps = {
    labelDate: getLibelle(`Date de naissance`),
    nomDate: withNamespace(props.nom, DATE_NAISSANCE),
    anneeMax: new Date().getFullYear()
  } as DateComposeFormProps;

  useEffect(() => {
    if (props.parent?.nomNaissance === SNP) {
      setPasDeNomConnu(true);
    }
  }, [props.parent?.nomNaissance]);

  function onChangePasDeNomConnu(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPasDeNomConnu(true);
      props.formik.setFieldValue(withNamespace(props.nom, NOM), "");
      props.formik.handleChange(e);
    } else {
      setPasDeNomConnu(false);
      props.formik.handleChange(e);
      props.formik.setFieldValue(pasDeNomConnuWithNamespace, "false");
    }
  }

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="IdentiteParentsForm">
          <CheckboxField
            name={pasDeNomConnuWithNamespace}
            label={getLibelle("Le parent n'a pas de nom connu")}
            values={[{ libelle: "", cle: PAS_DE_NOM_CONNU }]}
            onChange={onChangePasDeNomConnu}
          />

          {!pasDeNomConnu && (
            <InputField
              name={withNamespace(props.nom, NOM)}
              label={getLibelle("Nom")}
              maxLength={NB_CARACT_MAX_SAISIE}
              disabled={pasDeNomConnu}
            />
          )}

          <PrenomsConnusForm
            nom={props.nom}
            libelleAucunPrenom={getLibelle("Pas de prénom connu")}
            pasDePrenomConnu={props.parent?.prenoms?.[0].prenom === SPC}
            nbPrenoms={props.parent?.prenoms?.length}
          />

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
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                paysStatutRefugieWithNamespace
              )
            }
          />

          <InputField
            name={paysOrigineRefugieWithNamespace}
            label={getLibelle("Pays d'origine du réfugié")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                paysOrigineRefugieWithNamespace
              )
            }
          />
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect<ComponentFormProps & ISubForm>(
  IdentiteParentForm
);
