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
  NATURE,
  NOM,
  PRENOM,
  RAISON_SOCIALE
} from "../../../modelForm/ISaisirRequetePageModel";
import "./../scss/RequerantForm.scss";

// Valeurs par défaut des champs
export const AutreProfessionnelFormDefaultValues = {
  [NATURE]: "",
  [RAISON_SOCIALE]: "",
  [NOM]: "",
  [PRENOM]: ""
};

// Schéma de validation des champs
export const AutreProfessionnelFormValidationSchema = Yup.object().shape({
  [NATURE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [RAISON_SOCIALE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [NOM]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [PRENOM]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE)
});

const AutreProfessionnelForm: React.FC<SubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);

  return (
    <div className="RequerantSousForm">
      <InputField
        name={withNamespace(props.nom, NATURE)}
        label={getLibelle("Nature")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(props.nom, RAISON_SOCIALE)}
        label={getLibelle("Raison sociale")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={nomWithNamespace}
        label={getLibelle("Nom professionnel")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e => sortieChampEnMajuscule(e, props.formik, nomWithNamespace)}
      />
      <InputField
        name={prenomWithNamespace}
        label={getLibelle("Prénom professionnel")}
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

export default connect(AutreProfessionnelForm);
