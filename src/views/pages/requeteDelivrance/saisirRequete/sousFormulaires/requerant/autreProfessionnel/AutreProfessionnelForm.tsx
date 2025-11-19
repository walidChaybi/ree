import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { NB_CARACT_MAX_SAISIE, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../../ressources/Regex";
import { NATURE, NOM, PRENOM, RAISON_SOCIALE } from "../../../../../../common/composant/formulaire/ConstantesNomsForm";
import { getBlockRaisonSocialeNomPrenom } from "../../commun/communForm";
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
  [NATURE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [RAISON_SOCIALE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [NOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const AutreProfessionnelForm: React.FC<SubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);
  const raisonSocialeWithNamespace = withNamespace(props.nom, RAISON_SOCIALE);

  return (
    <div className="RequerantSousForm">
      <InputField
        name={withNamespace(props.nom, NATURE)}
        label={"Nature"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      {getBlockRaisonSocialeNomPrenom(
        raisonSocialeWithNamespace,
        "Raison sociale",
        nomWithNamespace,
        "Nom professionnel",
        prenomWithNamespace,
        "Prénom professionnel",
        props.formik
      )}
    </div>
  );
};

export default connect(AutreProfessionnelForm);
