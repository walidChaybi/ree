import { getLibelle } from "@util/Utils";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "@widget/formulaire/adresse/AdresseForm";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  ADRESSE_MAIL_NON_CONFORME,
  CARATERES_AUTORISES_MESSAGE,
  NUMERO_TELEPHONE_NON_CONFORME
} from "@widget/formulaire/FormulaireMessages";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  CENT_CARACT_MAX,
  ISubForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  TRENTE_HUIT_CARACT_MAX,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  CarateresAutorise,
  NumeroTelephone
} from "../../../../../../ressources/Regex";
import {
  ADRESSE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  NOM,
  NOM_USAGE,
  PRENOM
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import "./RequerantForm.scss";

export const RequerantFormDefaultValue = {
  [NOM]: "",
  [PRENOM]: "",
  [NOM_USAGE]: "",
  [ADRESSE]: AdresseFormDefaultValues,
  [AUTRE_ADRESSE_COURRIEL]: "",
  [AUTRE_NUMERO_TELEPHONE]: ""
};

export const RequerantFormValidationSchema = Yup.object().shape({
  [NOM]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
  [PRENOM]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [AUTRE_ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [AUTRE_NUMERO_TELEPHONE]: Yup.string().matches(
    NumeroTelephone,
    NUMERO_TELEPHONE_NON_CONFORME
  ),
  [ADRESSE]: AdresseFormValidationSchema
});

const RequerantForm: React.FC<SubFormProps> = props => {
  const [nomUsagePresent, setNomUsagePresent] = useState<boolean>(false);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);

  const nomUsageForm = props.formik.getFieldProps(nomUsageWithNamespace).value;

  const adresseFormProps = {
    nom: withNamespace(props.nom, ADRESSE),
    titre: getLibelle("Requérant")
  } as SubFormProps;
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);
  const courrielAutreContactWithNamespace = withNamespace(
    props.nom,
    AUTRE_ADRESSE_COURRIEL
  );
  const telephoneAutreContactWithNamespace = withNamespace(
    props.nom,
    AUTRE_NUMERO_TELEPHONE
  );
  const IGNORER_TABULATION = -1;

  useEffect(() => {
    if (nomUsageForm && !nomUsagePresent) {
      setNomUsagePresent(true);
    }
  }, [nomUsageForm, nomUsagePresent]);

  const toggleNomUsage = () => {
    props.formik.setFieldValue(nomUsageWithNamespace, "");
    setNomUsagePresent(!nomUsagePresent);
  };

  function getBoutonAjouter(): JSX.Element {
    return (
      <button
        type="button"
        tabIndex={IGNORER_TABULATION}
        disabled={nomUsagePresent}
        onClick={toggleNomUsage}
      >
        {getLibelle("Ajouter un nom d'usage")}
      </button>
    );
  }

  function getBoutonSupprimer(): JSX.Element {
    return (
      <button
        tabIndex={IGNORER_TABULATION}
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
    <SousFormulaire titre={props.titre}>
      <div className="RequerantForm">
        <div className="nomRequerant">
          <InputField
            name={nomWithNamespace}
            label={getLibelle("Nom")}
            maxLength={TRENTE_HUIT_CARACT_MAX}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                nomWithNamespace
              )
            }
          />
          {!nomUsagePresent && (
            <div className="BoutonsConteneur">{getBoutonAjouter()}</div>
          )}
        </div>

        {nomUsagePresent && (
          <div className="nomUsage">
            <InputField
              name={nomUsageWithNamespace}
              label={getLibelle("Nom d'usage")}
              maxLength={NB_CARACT_MAX_SAISIE}
              onBlur={e =>
                sortieChampPremiereLettreEnMajuscule(
                  e,
                  props.formik,
                  nomUsageWithNamespace
                )
              }
            />
            <div className="BoutonsConteneur">{getBoutonSupprimer()}</div>
          </div>
        )}
        <InputField
          name={prenomWithNamespace}
          label={getLibelle("Prénom")}
          maxLength={TRENTE_HUIT_CARACT_MAX}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              prenomWithNamespace
            )
          }
        />

        <AdresseForm
          key={withNamespace(props.nom, ADRESSE)}
          affichageSousFormulaire={false}
          {...adresseFormProps}
        />

        <InputField
          name={courrielAutreContactWithNamespace}
          label={getLibelle("Autre adresse courriel")}
          maxLength={CENT_CARACT_MAX}
        />
        <InputField
          name={telephoneAutreContactWithNamespace}
          label={getLibelle("Autre numéro de téléphone")}
          maxLength={CENT_CARACT_MAX}
        />
      </div>
    </SousFormulaire>
  );
};

export default connect<ISubForm>(RequerantForm);
