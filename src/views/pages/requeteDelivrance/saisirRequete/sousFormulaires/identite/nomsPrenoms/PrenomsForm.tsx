import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { DEUX, estRenseigne, getLibelle, UN, ZERO } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  CARATERES_AUTORISES_MESSAGE,
  CHAMP_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  IGNORER_TABULATION,
  INomForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../../ressources/Regex";
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

interface IPrenomsFormProps {
  prenoms?: IPrenomOrdonnes[];
  prenom1Obligatoire?: boolean;
}

export type PrenomsFormProps = IPrenomsFormProps & SubFormProps;

const PrenomsForm: React.FC<PrenomsFormProps> = props => {
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
    if (props.prenoms && props.prenoms.length > 1) {
      setNbPrenom(props.prenoms.length);
    }
  }, [props.prenoms]);

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
        tabIndex={IGNORER_TABULATION}
        className="BoutonDanger"
        disabled={btnSupprimerInactif}
        onClick={() => supprimerPrenom(champ)}
      >
        {getLibelle("Annuler la saisie")}
      </button>
    );
  }

  function estPrenomDisabled(index: number) {
    return (
      props.prenoms && estRenseigne(props.prenoms[index]) && props.disabled
    );
  }

  return (
    <>
      <div className="PrenomsForm">
        <InputField
          name={prenomWithNamespace1}
          label={getLibelle("Prénom 1")}
          maxLength={NB_CARACT_MAX_SAISIE}
          disabled={estPrenomDisabled(ZERO)}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              prenomWithNamespace1
            )
          }
          validate={(value: string) => {
            return !value && props.prenom1Obligatoire === true
              ? CHAMP_OBLIGATOIRE
              : undefined;
          }}
        />
        {nbPrenom === NB_MIN_PRENOMS && (
          <div className="BoutonsConteneur">{getBoutonAjouter()}</div>
        )}
      </div>
      {nbPrenom > NB_MIN_PRENOMS && (
        <div className="PrenomsForm">
          <InputField
            name={prenomWithNamespace2}
            label={getLibelle("Prénom 2")}
            maxLength={NB_CARACT_MAX_SAISIE}
            disabled={estPrenomDisabled(UN)}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                prenomWithNamespace2
              )
            }
          />
          {nbPrenom > NB_MIN_PRENOMS && nbPrenom < NB_MAX_PRENOMS && (
            <div className="BoutonsConteneur">
              {getBoutonAjouter()}
              {
                !estPrenomDisabled(UN) && getBoutonSupprimer(PRENOM_2) // pas d'affichage du bouton "supprimer" si le champs prénom est disabled
              }
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
            disabled={estPrenomDisabled(DEUX)}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                prenomWithNamespace3
              )
            }
          />
          <div className="BoutonsConteneur">
            {
              !estPrenomDisabled(DEUX) && getBoutonSupprimer(PRENOM_3) // pas d'affichage du bouton "supprimer" si le champs prénom est disabled
            }
          </div>
        </div>
      )}
    </>
  );
};

export default connect<IPrenomsFormProps & INomForm>(PrenomsForm);
