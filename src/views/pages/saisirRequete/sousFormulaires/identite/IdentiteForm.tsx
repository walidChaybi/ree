import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Nationalite } from "../../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { CarateresAutorise } from "../../../../../ressources/Regex";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { RadioField } from "../../../../common/widget/formulaire/champsSaisie/RadioField";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../common/widget/formulaire/FormulaireMessages";
import { SousFormulaire } from "../../../../common/widget/formulaire/SousFormulaire";
import { sortieChampEnMajuscule } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import {
  NAISSANCE,
  NATIONALITE,
  NOM_FAMILLE,
  NOM_USAGE,
  PARENT1,
  PARENT2,
  PRENOMS,
  SEXE
} from "../../modelForm/ISaisirRequetePageModel";
import EvenementForm, {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema,
  EvenementSubFormProps
} from "../evenement/EvenementForm";
import ParentForm, { ParentSubFormProps } from "./parent/ParentForm";
import PrenomsForm, {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "./prenoms/PrenomsForm";
import "./scss/IdentiteForm.scss";

// Valeurs par défaut des champs
export const IdentiteFormDefaultValues = {
  [NOM_FAMILLE]: "",
  [NOM_USAGE]: "",
  [PRENOMS]: PrenomsFormDefaultValues,
  [SEXE]: "INCONNU",
  [NAISSANCE]: EvenementFormDefaultValues,
  [NATIONALITE]: "INCONNUE",
  [PARENT1]: "",
  [PARENT2]: ""
};

// Schéma de validation des champs
export const IdentiteFormValidationSchema = Yup.object().shape({
  [NOM_FAMILLE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [NOM_USAGE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PRENOMS]: PrenomsFormValidationSchema,
  [SEXE]: Yup.string(),
  [NAISSANCE]: EvenementFormValidationSchema,
  [NATIONALITE]: Yup.string(),
  [PARENT1]: Yup.string(),
  [PARENT2]: Yup.string()
});

interface IdentiteFormProps {
  filiation?: boolean;
}

export type IdentiteSubFormProps = SubFormProps & IdentiteFormProps;

const IdentiteForm: React.FC<IdentiteSubFormProps> = props => {
  const nomFamilleWithNamespace = withNamespace(props.nom, NOM_FAMILLE);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);

  const [afficherParents, setAfficherParents] = useState(false);

  const prenomsFormProps = {
    nom: withNamespace(props.nom, PRENOMS),
    requete: props.requete
  } as SubFormProps;

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

  const ajouterFiliation = () => {
    setAfficherParents(!afficherParents);
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
          <InputField
            name={nomFamilleWithNamespace}
            label={getLibelle("Nom de famille")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampEnMajuscule(e, props.formik, nomFamilleWithNamespace)
            }
          />
          <InputField
            name={nomUsageWithNamespace}
            label={getLibelle("Nom d'usage")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampEnMajuscule(e, props.formik, nomUsageWithNamespace)
            }
          />
          <PrenomsForm {...prenomsFormProps} />
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
            <button type="button" onClick={ajouterFiliation}>
              {getLibelle("Ajouter une filiation")}
            </button>
          )}
          {afficherParents && props.filiation && (
            <button
              type="button"
              className="BoutonDanger"
              onClick={ajouterFiliation}
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
