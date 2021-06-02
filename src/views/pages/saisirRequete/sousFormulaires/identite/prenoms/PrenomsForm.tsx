import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../../common/widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import {
  PRENOM_1,
  PRENOM_2,
  PRENOM_3
} from "../../../modelForm/ISaisirRequetePageModel";
import "./scss/PrenomsForm.scss";

const NB_MIN_PRENOMS = 1;
const NB_MAX_PRENOMS = 3;

// Valeurs par défaut des champs
export const PrenomsFormDefaultValues = {
  [PRENOM_1]: "",
  [PRENOM_2]: "",
  [PRENOM_3]: ""
};

// Schéma de validation des champs
export const PrenomsFormValidationSchema = Yup.object()
  .shape({
    [PRENOM_1]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),

    [PRENOM_2]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [PRENOM_3]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    )
  })
  .test("prenomObligatoire1", function (value, error) {
    const prenom1 = value[PRENOM_1] as string;
    const prenom2 = value[PRENOM_2] as string;
    const prenom3 = value[PRENOM_3] as string;

    const params = {
      path: `${error.path}.prenom1`,
      message: getLibelle("La saisie du Prénom 1 est obligatoire")
    };

    return prenom1 == null && (prenom2 != null || prenom3 != null)
      ? this.createError(params)
      : true;
  })
  .test("prenomsObligatoire2", function (value, error) {
    const prenom2 = value[PRENOM_2] as string;
    const prenom3 = value[PRENOM_3] as string;

    const params = {
      path: `${error.path}.prenom2`,
      message: getLibelle("La saisie du Prénom 2 est obligatoire")
    };

    return prenom2 == null && prenom3 != null ? this.createError(params) : true;
  });

const PrenomsForm: React.FC<SubFormProps> = props => {
  const prenomWithNamespace1 = withNamespace(props.nom, PRENOM_1);
  const prenomWithNamespace2 = withNamespace(props.nom, PRENOM_2);
  const prenomWithNamespace3 = withNamespace(props.nom, PRENOM_3);

  const [nbPrenom, setNbPrenom] = useState<number>(1);
  const [btnAjouterInactif, setBtnAjouterInactif] = useState(false);
  const [btnSupprimerInactif, setBtnSupprimerInactif] = useState(true);

  const ajouterPrenom = () => {
    if (nbPrenom + 1 <= NB_MAX_PRENOMS) {
      setNbPrenom(nbPrenom + 1);
    }
  };

  const supprimerPrenom = (champ: string) => {
    if (nbPrenom - 1 >= NB_MIN_PRENOMS) {
      setNbPrenom(nbPrenom - 1);
      props.formik.setFieldValue(withNamespace(props.nom, champ), "");
    }
  };

  useEffect(() => {
    setBtnAjouterInactif(nbPrenom === NB_MAX_PRENOMS);
    setBtnSupprimerInactif(nbPrenom === NB_MIN_PRENOMS);
  }, [nbPrenom]);

  function getBoutonAjouter(): JSX.Element {
    return (
      <button
        type="button"
        disabled={btnAjouterInactif}
        onClick={ajouterPrenom}
      >
        {getLibelle("Ajouter un prénom")}
      </button>
    );
  }

  function getBoutonSupprimer(champ: string): JSX.Element {
    return (
      <button
        type="button"
        className="BoutonDanger"
        disabled={btnSupprimerInactif}
        onClick={() => supprimerPrenom(champ)}
      >
        {getLibelle("Supprimer un prénom")}
      </button>
    );
  }

  return (
    <>
      <div className="PrenomsForm">
        <InputField
          name={prenomWithNamespace1}
          label={getLibelle("Prénom 1")}
          maxLength={NB_CARACT_MAX_SAISIE}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              prenomWithNamespace1
            )
          }
        />
        {nbPrenom === NB_MIN_PRENOMS && <div>{getBoutonAjouter()}</div>}
      </div>
      {nbPrenom > NB_MIN_PRENOMS && (
        <div className="PrenomsForm">
          <InputField
            name={prenomWithNamespace2}
            label={getLibelle("Prénom 2")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                prenomWithNamespace2
              )
            }
          />
          {nbPrenom > NB_MIN_PRENOMS && nbPrenom < NB_MAX_PRENOMS && (
            <div>
              {getBoutonAjouter()}
              {getBoutonSupprimer(PRENOM_2)}
            </div>
          )}
        </div>
      )}
      {nbPrenom === NB_MAX_PRENOMS && (
        <div className="PrenomsForm">
          <InputField
            name={prenomWithNamespace3}
            label={getLibelle("Prénom 3")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                prenomWithNamespace3
              )
            }
          />
          <div>{getBoutonSupprimer(PRENOM_3)}</div>
        </div>
      )}
    </>
  );
};

export default connect(PrenomsForm);
