import React from "react";
import * as Yup from "yup";
import {
  withNamespace,
  SubFormProps,
  NB_CARACT_MAX_SAISIE
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { getLibelle } from "../../../../common/widget/Text";
import { SousFormulaire } from "../../../../common/widget/formulaire/SousFormulaire";
import "./scss/IdentiteForm.scss";
import { RadioField } from "../../../../common/widget/formulaire/champsSaisie/RadioField";
import PrenomsForm, {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "./prenoms/PrenomsForm";
import NaissanceForm, {
  NaissanceFormDefaultValues,
  NaissanceFormValidationSchema
} from "./naissance/NaissanceForm";
import { sortieChampEnMajuscule } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import { connect } from "formik";
import { CarateresAutorise } from "../../../../../ressources/Regex";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../common/widget/formulaire/FormulaireMessages";
import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { Nationalite } from "../../../../../model/etatcivil/enum/Nationalite";

// Noms des champs
export const NOM_FAMILLE = "nomFamille";
export const NOM_USAGE = "nomUsage";
export const PRENOMS = "prenoms";
export const SEXE = "sexe";
export const NAISSANCE = "naissance";
export const NATIONALITE = "nationalite";

// Valeurs par défaut des champs
export const IdentiteFormDefaultValues = {
  [NOM_FAMILLE]: "",
  [NOM_USAGE]: "",
  [PRENOMS]: PrenomsFormDefaultValues,
  [SEXE]: "INCONNU",
  [NAISSANCE]: NaissanceFormDefaultValues,
  [NATIONALITE]: "INCONNU"
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
  [NAISSANCE]: NaissanceFormValidationSchema,
  [NATIONALITE]: Yup.string()
});

const IdentiteForm: React.FC<SubFormProps> = props => {
  const nomFamilleWithNamespace = withNamespace(props.nom, NOM_FAMILLE);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);

  const prenomsFormProps = {
    nom: withNamespace(props.nom, PRENOMS)
  } as SubFormProps;

  const naissanceFormProps = {
    nom: withNamespace(props.nom, NAISSANCE)
  } as SubFormProps;

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="IdentiteForm">
          <InputField
            name={nomFamilleWithNamespace}
            label={getLibelle("Nom de Famille")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onChange={e =>
              sortieChampEnMajuscule(
                e.target.value,
                props.formik,
                nomFamilleWithNamespace
              )
            }
          />
          <InputField
            name={nomUsageWithNamespace}
            label={getLibelle("Nom d'usage")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onChange={e =>
              sortieChampEnMajuscule(
                e.target.value,
                props.formik,
                nomUsageWithNamespace
              )
            }
          />
          <PrenomsForm {...prenomsFormProps} />
          <RadioField
            name={withNamespace(props.nom, SEXE)}
            label={getLibelle("Sexe")}
            values={Sexe.getAllEnumsAsOptions()}
          />
          <NaissanceForm {...naissanceFormProps} />
          <RadioField
            name={withNamespace(props.nom, NATIONALITE)}
            label={getLibelle("Nationalité")}
            values={Nationalite.getAllEnumsAsOptions()}
          />
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(IdentiteForm);
