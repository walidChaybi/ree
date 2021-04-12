import React from "react";
import * as Yup from "yup";
import {
  withNamespace,
  SubFormProps,
  NB_CARACT_MAX_SAISIE,
  NB_CARACT_ADRESSE,
  NB_CARACT_CODE_POSTAL,
  NB_CARACT_COMMUNE
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { getLibelle } from "../../../../common/widget/Text";
import { SousFormulaire } from "../../../../common/widget/formulaire/SousFormulaire";
import "./scss/AdresseForm.scss";
import { connect } from "formik";
import { sortieChampEnMajuscule } from "../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  CarateresAutorise,
  NumeroTelephone
} from "../../../../../ressources/Regex";
import {
  CARATERES_AUTORISES_MESSAGE,
  ADRESSE_MAIL_NON_CONFORME,
  NUMERO_TELEPHONE_NON_CONFORME
} from "../../../../common/widget/formulaire/FormulaireMessages";

// Noms des champs
export const VOIE = "voie";
export const LIEU_DIT = "lieuDit";
export const COMPLEMENT_DESTINATAIRE = "complementDestinataire";
export const COMPLEMENT_POINT_GEO = "complementPointGeo";
export const CODE_POSTAL = "codePostal";
export const COMMUNE = "commune";
export const PAYS = "pays";
export const ADRESSE_COURRIEL = "adresseCourriel";
export const NUMERO_TELEPHONE = "numeroTelephone";

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

// Schéma de validation des champs
export const AdresseFormValidationSchema = Yup.object().shape({
  [VOIE]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [LIEU_DIT]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [COMPLEMENT_DESTINATAIRE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [COMPLEMENT_POINT_GEO]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [CODE_POSTAL]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [COMMUNE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PAYS]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [NUMERO_TELEPHONE]: Yup.string().matches(
    NumeroTelephone,
    NUMERO_TELEPHONE_NON_CONFORME
  )
});

const AdresseForm: React.FC<SubFormProps> = props => {
  const voieWithNamespace = withNamespace(props.nom, VOIE);
  const lieuDitWithNamespace = withNamespace(props.nom, LIEU_DIT);
  const destinataireWithNamespace = withNamespace(
    props.nom,
    COMPLEMENT_DESTINATAIRE
  );
  const pointGeoWithNamespace = withNamespace(props.nom, COMPLEMENT_POINT_GEO);
  const communeWithNamespace = withNamespace(props.nom, COMMUNE);
  const paysWithNamespace = withNamespace(props.nom, PAYS);

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="AdresseForm">
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
          <InputField
            name={destinataireWithNamespace}
            label={getLibelle("Complément d’identification du destinataire")}
            placeholder={getLibelle(
              "Appartement, boite aux lettres, étage, couloir, escalier, chez…"
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
          <div className="CodePostal">
            <InputField
              name={withNamespace(props.nom, CODE_POSTAL)}
              label={getLibelle("Code postal")}
              maxLength={NB_CARACT_CODE_POSTAL}
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
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(AdresseForm);
