import {
  NATIONALITE_1,
  NATIONALITE_2,
  NATIONALITE_3
} from "@composant/formulaire/ConstantesNomsForm";
import { DEUX, estRenseigne, getLibelle, UN } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  IGNORER_TABULATION,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../ressources/Regex";
import "./scss/Nationalite.scss";

const NB_MIN_NATIONALITES = 1;
const NB_MAX_NATIONALITES = 3;

// Valeurs par défaut des champs
export const NationalitesFormDefaultValues = {
  [NATIONALITE_1]: "",
  [NATIONALITE_2]: "",
  [NATIONALITE_3]: ""
};

// Schéma de validation des champs
export const NationalitesFormValidationSchema = Yup.object()
  .shape({
    [NATIONALITE_1]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),

    [NATIONALITE_2]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [NATIONALITE_3]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    )
  })
  .test("NATIONALITEObligatoire1", function (value, error) {
    const NATIONALITE1 = value[NATIONALITE_1] as string;
    const NATIONALITE2 = value[NATIONALITE_2] as string;
    const NATIONALITE3 = value[NATIONALITE_3] as string;

    const params = {
      path: `${error.path}.NATIONALITE1`,
      message: getLibelle("La saisie du Nationalité 1 est obligatoire")
    };

    return NATIONALITE1 == null &&
      (NATIONALITE2 != null || NATIONALITE3 != null)
      ? this.createError(params)
      : true;
  })
  .test("NATIONALITEsObligatoire2", function (value, error) {
    const NATIONALITE2 = value[NATIONALITE_2] as string;
    const NATIONALITE3 = value[NATIONALITE_3] as string;

    const params = {
      path: `${error.path}.NATIONALITE2`,
      message: getLibelle("La saisie du Nationalité 2 est obligatoire")
    };

    return NATIONALITE2 == null && NATIONALITE3 != null
      ? this.createError(params)
      : true;
  });

interface INationaliteOrdonnes {
  nationalite: string;
  numeroOrdre: number;
}

interface INationaliteFormProps {
  nationalites?: INationaliteOrdonnes[];
}
export type NationalitesFormProps = INationaliteFormProps & SubFormProps;

const NationalitesForm: React.FC<NationalitesFormProps> = props => {
  const NationaliteWithNamespace1 = withNamespace(props.nom, NATIONALITE_1);
  const NationaliteWithNamespace2 = withNamespace(props.nom, NATIONALITE_2);
  const NationaliteWithNamespace3 = withNamespace(props.nom, NATIONALITE_3);

  const [nbNATIONALITE, setNbNATIONALITE] = useState<number>(1);
  const [btnAjouterInactif, setBtnAjouterInactif] = useState(false);
  const [btnSupprimerInactif, setBtnSupprimerInactif] = useState(true);

  const ajouterNATIONALITE = () => {
    if (nbNATIONALITE + 1 <= NB_MAX_NATIONALITES) {
      setNbNATIONALITE(nbNATIONALITE + 1);
    }
  };

  const supprimerNATIONALITE = (champ: string) => {
    if (nbNATIONALITE - 1 >= NB_MIN_NATIONALITES) {
      setNbNATIONALITE(nbNATIONALITE - 1);
      props.formik.setFieldValue(withNamespace(props.nom, champ), "");
    }
  };

  useEffect(() => {
    setBtnAjouterInactif(nbNATIONALITE === NB_MAX_NATIONALITES);
    setBtnSupprimerInactif(nbNATIONALITE === NB_MIN_NATIONALITES);
  }, [nbNATIONALITE]);

  function getBoutonAjouter(): JSX.Element {
    return (
      <button
        type="button"
        disabled={btnAjouterInactif}
        onClick={ajouterNATIONALITE}
      >
        {getLibelle("Ajouter une nationalité")}
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
        onClick={() => supprimerNATIONALITE(champ)}
      >
        {getLibelle("Annuler la saisie")}
      </button>
    );
  }

  function estPrenomDisabled(index: number) {
    return (
      props.nationalites &&
      estRenseigne(props.nationalites[index]) &&
      props.disabled
    );
  }

  return (
    <>
      <div className="NationalitesForm">
        <InputField
          name={NationaliteWithNamespace1}
          label={getLibelle("Nationalité 1")}
          maxLength={NB_CARACT_MAX_SAISIE}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              NationaliteWithNamespace1
            )
          }
        />
        {nbNATIONALITE === NB_MIN_NATIONALITES && (
          <div className="BoutonsConteneur">{getBoutonAjouter()}</div>
        )}
      </div>
      {nbNATIONALITE > NB_MIN_NATIONALITES && (
        <div className="NationalitesForm">
          <InputField
            name={NationaliteWithNamespace2}
            label={getLibelle("Nationalité 2")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                NationaliteWithNamespace2
              )
            }
          />
          {nbNATIONALITE > NB_MIN_NATIONALITES &&
            nbNATIONALITE < NB_MAX_NATIONALITES && (
              <div className="BoutonsConteneur">
                {getBoutonAjouter()}
                {
                  !estPrenomDisabled(UN) && getBoutonSupprimer(NATIONALITE_2) // pas d'affichage du bouton "supprimer" si le champs prénom est disabled
                }
              </div>
            )}
        </div>
      )}
      {nbNATIONALITE === NB_MAX_NATIONALITES && (
        <div className="NationalitesForm">
          <InputField
            name={NationaliteWithNamespace3}
            label={getLibelle("Nationalité 3")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                NationaliteWithNamespace3
              )
            }
          />
          <div className="BoutonsConteneur">
            {
              !estPrenomDisabled(DEUX) && getBoutonSupprimer(NATIONALITE_3) // pas d'affichage du bouton "supprimer" si le champs prénom est disabled
            }
          </div>
        </div>
      )}
    </>
  );
};

export default connect(NationalitesForm);
