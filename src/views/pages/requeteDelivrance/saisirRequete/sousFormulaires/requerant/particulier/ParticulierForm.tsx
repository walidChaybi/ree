import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import InputFieldAvecBoutonMajuscule from "@widget/formulaire/champsSaisie/InputFieldAvecBoutonMajuscule";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import { NB_CARACT_MAX_SAISIE, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../../ressources/Regex";
import { NOM_NAISSANCE, NOM_USAGE, PRENOM } from "../../../../../../common/composant/formulaire/ConstantesNomsForm";
import "./../scss/RequerantForm.scss";

// Valeurs par défaut des champs
export const ParticulierFormDefaultValues = {
  [NOM_NAISSANCE]: "",
  [NOM_USAGE]: "",
  [PRENOM]: ""
};

// Schéma de validation des champs
export const ParticulierFormValidationSchema = Yup.object().shape({
  [NOM_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [NOM_USAGE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const ParticulierForm: React.FC<SubFormProps> = props => {
  const nomNaissanceWithNamespace = withNamespace(props.nom, NOM_NAISSANCE);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);

  return (
    <div className="RequerantSousForm">
      <InputFieldAvecBoutonMajuscule
        name={nomNaissanceWithNamespace}
        label={"Nom de naissance"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputFieldAvecBoutonMajuscule
        name={nomUsageWithNamespace}
        label={"Nom d'usage"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(props.nom, PRENOM)}
        label={"Prénom"}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, prenomWithNamespace)}
      />
    </div>
  );
};

export default connect(ParticulierForm);
