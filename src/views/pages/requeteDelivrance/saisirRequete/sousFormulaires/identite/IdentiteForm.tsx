import {
  NAISSANCE,
  NATIONALITE,
  NOMS,
  PARENT1,
  PARENT2,
  PRENOMS,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import ParentForm, {
  ParentFormDefaultValues,
  ParentFormValidationSchema,
  ParentSubFormProps
} from "@composant/formulaire/ParentForm";
import PrenomsForm, {
  creerValidationSchemaPrenom,
  genererDefaultValuesPrenoms
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { getLibelle } from "@util/Utils";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import NomsForm, {
  NomsFormDefaultValues,
  NomsFormProps,
  NomsFormValidationSchema
} from "../../../../../common/composant/formulaire/nomsPrenoms/NomsForm";
import EvenementForm, {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema,
  EvenementSubFormProps
} from "../evenement/EvenementForm";
import "./scss/IdentiteForm.scss";

// Valeurs par défaut des champs pour RDAPC et RDC
export const IdentiteFormDefaultValues = {
  [NOMS]: NomsFormDefaultValues,
  [PRENOMS]: genererDefaultValuesPrenoms(),
  [SEXE]: "INCONNU",
  [NAISSANCE]: EvenementFormDefaultValues,
  [NATIONALITE]: "INCONNUE",
  [PARENT1]: ParentFormDefaultValues,
  [PARENT2]: ParentFormDefaultValues
};

// La valeur par défaut de la nationalité est ETRANGERE uniquement pour la saisie de RDCSC
export const IdentiteFormDefaultValuesRDCSC = {
  ...IdentiteFormDefaultValues,
  nationalite: "ETRANGERE"
};

// Schéma de validation des champs
export const IdentiteFormValidationSchema = Yup.object().shape({
  [NOMS]: NomsFormValidationSchema,
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string(),
  [NAISSANCE]: EvenementFormValidationSchema,
  [NATIONALITE]: Yup.string(),
  [PARENT1]: ParentFormValidationSchema,
  [PARENT2]: ParentFormValidationSchema
});

export const IdentiteFormValidationSchemaRDCSC = Yup.object().shape({
  [NOMS]: NomsFormValidationSchema,
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string(),
  [NAISSANCE]: EvenementFormValidationSchema,
  [NATIONALITE]: Yup.string(),
  [PARENT1]: ParentFormValidationSchema,
  [PARENT2]: ParentFormValidationSchema
});

interface IdentiteFormProps {
  filiation?: boolean;
  titulaire?: ITitulaireRequete;
}

export type IdentiteSubFormProps = SubFormProps & IdentiteFormProps;

const IdentiteForm: React.FC<IdentiteSubFormProps> = props => {
  const [afficherParents, setAfficherParents] = useState(false);

  useEffect(() => {
    if (props.titulaire?.parentsTitulaire?.length) {
      setAfficherParents(true);
    }
  }, [props.titulaire?.parentsTitulaire?.length]);

  const nomsFormProps = {
    nom: withNamespace(props.nom, NOMS),
    titulaire: props.titulaire
  } as NomsFormProps;

  const naissanceFormProps = {
    nom: withNamespace(props.nom, NAISSANCE),
    libelle: getLibelle("naissance")
  } as EvenementSubFormProps;

  const parent1FormProps = {
    nom: withNamespace(props.nom, PARENT1),
    index: 1,
    reset: afficherParents
  } as ParentSubFormProps;

  const parent2FormProps = {
    nom: withNamespace(props.nom, PARENT2),
    index: 2,
    reset: afficherParents
  } as ParentSubFormProps;

  const toggleAffichageChampsParents = () => {
    setAfficherParents(!afficherParents);
    // Permet de re-initilaiser les champs PARENT1 et PARENT2
    props.formik.setFieldValue(
      withNamespace(props.nom, PARENT1),
      ParentFormDefaultValues
    );
    props.formik.setFieldValue(
      withNamespace(props.nom, PARENT2),
      ParentFormDefaultValues
    );
  };

  useEffect(() => {
    if (props.reset) {
      props.formik.setFieldValue(props.nom, IdentiteFormDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset]);

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="IdentiteForm">
          <NomsForm {...nomsFormProps} />
          <PrenomsForm
            nom={withNamespace(props.nom, PRENOMS)}
            nbPrenoms={props.titulaire?.prenoms?.length}
          />
          <RadioField
            name={withNamespace(props.nom, SEXE)}
            label={getLibelle("Sexe")}
            values={Sexe.getAllEnumsAsOptions()}
          />
          <EvenementForm {...naissanceFormProps} />
          <RadioField
            name={withNamespace(props.nom, NATIONALITE)}
            label={getLibelle("Nationalité")}
            values={Nationalite.getAllEnumsAsOptions()}
          />
          {!afficherParents && props.filiation && (
            <button type="button" onClick={toggleAffichageChampsParents}>
              {getLibelle("Ajouter une filiation")}
            </button>
          )}
          {afficherParents && props.filiation && (
            <button
              type="button"
              className="BoutonDanger"
              onClick={toggleAffichageChampsParents}
            >
              {getLibelle("Supprimer une filiation")}
            </button>
          )}
          {afficherParents && props.filiation && (
            <>
              <ParentForm {...parent1FormProps} />
              <ParentForm {...parent2FormProps} />
            </>
          )}
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(IdentiteForm);
