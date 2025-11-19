import { ENationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { enumVersOptions } from "@util/Utils";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import { SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import {
  NAISSANCE,
  NATIONALITE,
  NOMS,
  PARENT1,
  PARENT2,
  PRENOMS,
  SEXE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import NomsForm, {
  NomsFormDefaultValues,
  NomsFormProps,
  NomsFormValidationSchema
} from "../../../../../common/composant/formulaire/nomsPrenoms/NomsForm";
import PrenomsForm, {
  creerValidationSchemaPrenom,
  genererDefaultValuesPrenoms
} from "../../../../../common/composant/formulaire/nomsPrenoms/PrenomsForm";
import ParentForm, {
  ParentFormDefaultValues,
  ParentFormValidationSchema,
  ParentSubFormProps
} from "../../../../../common/composant/formulaire/ParentForm";
import EvenementForm, {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema,
  EvenementSubFormProps
} from "../evenement/EvenementForm";
import "./scss/IdentiteForm.scss";

// Valeurs par défaut des champs pour RDAPC et RDC
const IdentiteFormDefaultValues = {
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
  const titulaires = useMemo(() => props.titulaire?.parentsTitulaire || [], [props.titulaire?.parentsTitulaire]);

  useEffect(() => {
    if (titulaires.length) {
      setAfficherParents(true);
    }
  }, [titulaires]);

  const nomsFormProps = {
    nom: withNamespace(props.nom, NOMS),
    titulaire: props.titulaire
  } as NomsFormProps;

  const naissanceFormProps = {
    nom: withNamespace(props.nom, NAISSANCE),
    libelle: "naissance"
  } as EvenementSubFormProps;

  const parent1FormProps = {
    nom: withNamespace(props.nom, PARENT1),
    index: 1,
    nbPrenoms: titulaires.length > 0 ? titulaires[0]?.prenoms?.length : 1
  } as ParentSubFormProps;

  const parent2FormProps = {
    nom: withNamespace(props.nom, PARENT2),
    index: 2,
    nbPrenoms: titulaires.length > 1 ? titulaires[1]?.prenoms?.length : 1
  } as ParentSubFormProps;

  const toggleAffichageChampsParents = () => {
    setAfficherParents(!afficherParents);
    // Permet de re-initilaiser les champs PARENT1 et PARENT2
    props.formik.setFieldValue(withNamespace(props.nom, PARENT1), ParentFormDefaultValues);
    props.formik.setFieldValue(withNamespace(props.nom, PARENT2), ParentFormDefaultValues);
  };

  useEffect(() => {
    if (props.reset) {
      props.formik.setFieldValue(props.nom, IdentiteFormDefaultValues);
    }
  }, [props.reset]);

  return (
    <SousFormulaire titre={props.titre}>
      <div className="IdentiteForm">
        <NomsForm {...nomsFormProps} />
        <PrenomsForm
          nom={withNamespace(props.nom, PRENOMS)}
          nbPrenoms={props.titulaire?.prenoms?.length}
        />
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label="Sexe"
          values={Sexe.getAllEnumsAsOptions()}
        />
        <EvenementForm {...naissanceFormProps} />
        <RadioField
          name={withNamespace(props.nom, NATIONALITE)}
          label="Nationalité"
          values={enumVersOptions(ENationalite)}
        />
        {!afficherParents && props.filiation && (
          <button
            type="button"
            onClick={toggleAffichageChampsParents}
          >
            {"Ajouter une filiation"}
          </button>
        )}
        {afficherParents && props.filiation && (
          <button
            type="button"
            className="BoutonDanger"
            onClick={toggleAffichageChampsParents}
          >
            {"Supprimer une filiation"}
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
  );
};

export default connect(IdentiteForm);
