import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  INomForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
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
  [VILLE_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [REGION_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PAYS_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  )
});

const EvenementEtrangerForm: React.FC<SubFormProps> = props => {
  const villeWithNamespace = withNamespace(props.nom, VILLE_NAISSANCE);
  const regionWithNamespace = withNamespace(props.nom, REGION_NAISSANCE);
  const paysWithNamespace = withNamespace(props.nom, PAYS_NAISSANCE);

  return (
    <div className="EvenementEtrangerForm">
      <>
        <InputField
          name={withNamespace(props.nom, VILLE_NAISSANCE)}
          label={getLibelle("Ville de naissance")}
          maxLength={NB_CARACT_MAX_SAISIE}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              villeWithNamespace
            )
          }
        />

        <InputField
          name={withNamespace(props.nom, REGION_NAISSANCE)}
          label={getLibelle("Région/état de naissance")}
          maxLength={NB_CARACT_MAX_SAISIE}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              regionWithNamespace
            )
          }
        />

        <InputField
          name={withNamespace(props.nom, PAYS_NAISSANCE)}
          label={getLibelle(`Pays de naissance`)}
          maxLength={NB_CARACT_MAX_SAISIE}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              paysWithNamespace
            )
          }
        />
      </>
    </div>
  );
};

export default connect<INomForm>(EvenementEtrangerForm);
