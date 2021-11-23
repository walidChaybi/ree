import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../../common/widget/formulaire/FormulaireMessages";
import { sortieChampEnMajuscule } from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import {
  NOM_NAISSANCE,
  NOM_USAGE
} from "../../../modelForm/ISaisirRequetePageModel";
import "./scss/PrenomsForm.scss";

// Valeurs par défaut des champs
export const NomsFormDefaultValues = {
  [NOM_NAISSANCE]: "",
  [NOM_USAGE]: ""
};

// Schéma de validation des champs
export const NomsFormValidationSchema = Yup.object().shape({
  [NOM_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [NOM_USAGE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  )
});

const NomsForm: React.FC<SubFormProps> = props => {
  const nomNaissanceWithNamespace = withNamespace(props.nom, NOM_NAISSANCE);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);

  const [nomUsagePresent, setNomUsagePresent] = useState<boolean>(false);

  const toggleNomUsage = () => {
    props.formik.setFieldValue(nomUsageWithNamespace, "");
    setNomUsagePresent(!nomUsagePresent);
  };

  useEffect(() => {
    if (
      props.requete &&
      props.requete.titulaires &&
      props.requete.titulaires[0] &&
      props.requete.titulaires[0].nomUsage
    ) {
      setNomUsagePresent(true);
    }
  }, [props.requete]);

  function getBoutonAjouter(): JSX.Element {
    return (
      <button type="button" disabled={nomUsagePresent} onClick={toggleNomUsage}>
        {getLibelle("Ajouter un nom d'usage")}
      </button>
    );
  }

  function getBoutonSupprimer(): JSX.Element {
    return (
      <button
        type="button"
        className="BoutonDanger"
        disabled={!nomUsagePresent}
        onClick={toggleNomUsage}
      >
        {getLibelle("Supprimer le nom d'usage")}
      </button>
    );
  }

  return (
    <>
      <div className="PrenomsForm">
        <InputField
          name={nomNaissanceWithNamespace}
          label={getLibelle("Nom de naissance")}
          maxLength={NB_CARACT_MAX_SAISIE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, nomNaissanceWithNamespace)
          }
        />

        {!nomUsagePresent && <div>{getBoutonAjouter()}</div>}
      </div>
      {nomUsagePresent && (
        <div className="PrenomsForm">
          <InputField
            name={nomUsageWithNamespace}
            label={getLibelle("Nom d'usage")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampEnMajuscule(e, props.formik, nomUsageWithNamespace)
            }
          />
          {nomUsagePresent && <div>{getBoutonSupprimer()}</div>}
        </div>
      )}
    </>
  );
};

export default connect(NomsForm);
