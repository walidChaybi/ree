import { getLibelle } from "@util/Utils";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { INomForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import ChampTexte from "../../../../../../composants/commun/champs/ChampTexte";
import { CaracteresAutorises } from "../../../../../../ressources/Regex";
import {
  ARRONDISSEMENT_NAISSANCE,
  LIEU_DE_NAISSANCE,
  PAYS_NAISSANCE,
  REGION_NAISSANCE,
  VILLE_NAISSANCE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import "./scss/EvenementForm.scss";

export const EvenementEtrangerFormDefaultValues = {
  [VILLE_NAISSANCE]: "",
  [ARRONDISSEMENT_NAISSANCE]: "",
  [REGION_NAISSANCE]: "",
  [PAYS_NAISSANCE]: ""
};

export const EvenementEtrangerFormValidationSchema = Yup.object().shape({
  [LIEU_DE_NAISSANCE]: Yup.boolean(),
  [VILLE_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [REGION_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const EvenementEtrangerForm: React.FC<SubFormProps> = props => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampTexte
        name={withNamespace(props.nom, VILLE_NAISSANCE)}
        libelle={getLibelle("Ville de naissance")}
        optionFormatage="PREMIER_MAJUSCULE"
      />
      <ChampTexte
        name={withNamespace(props.nom, REGION_NAISSANCE)}
        libelle={getLibelle("Région/état de naissance")}
        optionFormatage="PREMIER_MAJUSCULE"
      />
      <ChampTexte
        name={withNamespace(props.nom, PAYS_NAISSANCE)}
        libelle={getLibelle(`Pays de naissance`)}
        optionFormatage="PREMIER_MAJUSCULE"
      />
    </div>
  );
};

export default connect<INomForm>(EvenementEtrangerForm);
