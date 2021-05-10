import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../../common/widget/formulaire/FormulaireMessages";
import {
  sortieChampEnMajuscule,
  sortieChampPremiereLettreEnMajuscule
} from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import {
  NOM_FAMILLE,
  NOM_USAGE,
  PRENOM
} from "../../../modelForm/ISaisirRDCSCPageModel";
import "./../scss/RequerantForm.scss";

// Valeurs par défaut des champs
export const ParticulierFormDefaultValues = {
  [NOM_FAMILLE]: "",
  [NOM_USAGE]: "",
  [PRENOM]: ""
};

// Schéma de validation des champs
export const ParticulierFormValidationSchema = Yup.object().shape({
  [NOM_FAMILLE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [NOM_USAGE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PRENOM]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE)
});

const ParticulierForm: React.FC<SubFormProps> = props => {
  const nomFamilleWithNamespace = withNamespace(props.nom, NOM_FAMILLE);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);

  return (
    <div className="RequerantSousForm">
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
      <InputField
        name={withNamespace(props.nom, PRENOM)}
        label={getLibelle("Prénom")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e =>
          sortieChampPremiereLettreEnMajuscule(
            e,
            props.formik,
            prenomWithNamespace
          )
        }
      />
    </div>
  );
};

export default connect(ParticulierForm);
