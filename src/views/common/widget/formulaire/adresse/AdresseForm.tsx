import {
  ADRESSE_COURRIEL,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  LIEU_DIT,
  NUMERO_TELEPHONE,
  PAYS,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { getLibelle } from "@util/Utils";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  CaracteresAutorises,
  NumeroTelephone
} from "../../../../../ressources/Regex";
import {
  ADRESSE_MAIL_NON_CONFORME,
  CARACTERES_AUTORISES_MESSAGE,
  CHAMP_OBLIGATOIRE,
  NUMERO_TELEPHONE_NON_CONFORME
} from "../FormulaireMessages";
import { SousFormulaire } from "../SousFormulaire";
import { InputField } from "../champsSaisie/InputField";
import { sortieChampEnMajuscule } from "../utils/ControlesUtil";
import {
  NB_CARACT_ADRESSE,
  NB_CARACT_COMMUNE,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../utils/FormUtil";
import "./scss/AdresseForm.scss";

// Valeurs par défaut des champs
export const AdresseFormDefaultValues = {
  [VOIE]: "",
  [LIEU_DIT]: "",
  [COMPLEMENT_DESTINATAIRE]: "",
  [COMPLEMENT_POINT_GEO]: "",
  [CODE_POSTAL]: "",
  [COMMUNE]: "",
  [PAYS]: "",
  [ADRESSE_COURRIEL]: "",
  [NUMERO_TELEPHONE]: ""
};

interface AdresseFormProps {
  affichageSousFormulaire?: boolean;
}

// Schéma de validation des champs
export const AdresseFormValidationSchema = Yup.object().shape({
  [VOIE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [LIEU_DIT]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [COMPLEMENT_DESTINATAIRE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [COMPLEMENT_POINT_GEO]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [CODE_POSTAL]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [COMMUNE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [PAYS]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [NUMERO_TELEPHONE]: Yup.string().matches(
    NumeroTelephone,
    NUMERO_TELEPHONE_NON_CONFORME
  )
});

export const AdresseFormValidationSchemaRequired = Yup.object().shape({
  [VOIE]: Yup.string()
    .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
    .required(CHAMP_OBLIGATOIRE),
  [LIEU_DIT]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [COMPLEMENT_DESTINATAIRE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [COMPLEMENT_POINT_GEO]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [CODE_POSTAL]: Yup.string()
    .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
    .required(CHAMP_OBLIGATOIRE),
  [COMMUNE]: Yup.string()
    .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
    .required(CHAMP_OBLIGATOIRE),
  [PAYS]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [NUMERO_TELEPHONE]: Yup.string().matches(
    NumeroTelephone,
    NUMERO_TELEPHONE_NON_CONFORME
  )
});

const AdresseForm: React.FC<SubFormProps & AdresseFormProps> = ({
  affichageSousFormulaire = true,
  ...props
}) => {
  const voieWithNamespace = withNamespace(props.nom, VOIE);
  const lieuDitWithNamespace = withNamespace(props.nom, LIEU_DIT);
  const destinataireWithNamespace = withNamespace(
    props.nom,
    COMPLEMENT_DESTINATAIRE
  );
  const pointGeoWithNamespace = withNamespace(props.nom, COMPLEMENT_POINT_GEO);
  const communeWithNamespace = withNamespace(props.nom, COMMUNE);
  const paysWithNamespace = withNamespace(props.nom, PAYS);

  function getAddresseForm(): JSX.Element {
    return (
      <div className="AdresseForm">
        <InputField
          name={destinataireWithNamespace}
          label={getLibelle("Complément d’identification du destinataire")}
          placeholder={getLibelle(
            "Appartement, boite aux lettres, escalier, chez…"
          )}
          maxLength={NB_CARACT_ADRESSE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, destinataireWithNamespace)
          }
        />
        <InputField
          name={pointGeoWithNamespace}
          label={getLibelle(
            "Complément d’identification du point géographique"
          )}
          placeholder={getLibelle("Entrée, bâtiment, immeuble, résidence…")}
          maxLength={NB_CARACT_ADRESSE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, pointGeoWithNamespace)
          }
        />
        <InputField
          name={voieWithNamespace}
          label={getLibelle("Numéro, type et nom de la voie")}
          placeholder={getLibelle("Numéro, type et nom de la voie")}
          maxLength={NB_CARACT_ADRESSE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, voieWithNamespace)
          }
        />
        <InputField
          name={lieuDitWithNamespace}
          label={getLibelle(
            "Lieu-dit, boite postale ou état/province (à l'étranger)"
          )}
          placeholder={getLibelle(
            "Lieu-dit, boite postale ou état/province à l'étranger"
          )}
          maxLength={NB_CARACT_ADRESSE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, lieuDitWithNamespace)
          }
        />
        <div className="CodePostal">
          <InputField
            name={withNamespace(props.nom, CODE_POSTAL)}
            label={getLibelle("Code postal")}
          />
        </div>
        <InputField
          name={communeWithNamespace}
          label={getLibelle("Commune")}
          maxLength={NB_CARACT_COMMUNE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, communeWithNamespace)
          }
        />
        <InputField
          name={paysWithNamespace}
          label={getLibelle("Pays")}
          maxLength={NB_CARACT_ADRESSE}
          onBlur={e =>
            sortieChampEnMajuscule(e, props.formik, paysWithNamespace)
          }
        />
        {!props.formulaireReduit && (
          <>
            <InputField
              name={withNamespace(props.nom, ADRESSE_COURRIEL)}
              label={getLibelle("Adresse courriel du requérant")}
              maxLength={NB_CARACT_MAX_SAISIE}
            />
            <div className="Telephone">
              <InputField
                name={withNamespace(props.nom, NUMERO_TELEPHONE)}
                label={getLibelle("Numéro téléphone du requérant")}
                placeholder={getLibelle("(Indicatif) numero")}
                maxLength={NB_CARACT_MAX_SAISIE}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {affichageSousFormulaire ? (
        <SousFormulaire titre={props.titre}>{getAddresseForm()}</SousFormulaire>
      ) : (
        getAddresseForm()
      )}
    </>
  );
};

export default connect(AdresseForm);
