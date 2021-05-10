import { connect } from "formik";
import React from "react";
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
  PRENOMS,
  SEXE
} from "../../modelForm/ISaisirRDCSCPageModel";
import NaissanceForm, {
  NaissanceFormDefaultValues,
  NaissanceFormValidationSchema
} from "./naissance/NaissanceForm";
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
