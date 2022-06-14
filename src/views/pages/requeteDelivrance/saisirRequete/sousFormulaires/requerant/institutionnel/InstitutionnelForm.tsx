import { connect } from "formik";
import React, { useState } from "react";
import { TypeInstitutionnel } from "../../../../../../../model/requete/enum/TypeInstitutionnel";
import { getLibelle } from "../../../../../../common/util/Utils";
import { InputField } from "../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../../../common/widget/formulaire/champsSaisie/SelectField";
import {
  sortieChampEnMajuscule,
  sortieChampPremiereLettreEnMajuscule
} from "../../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../../common/widget/formulaire/utils/FormUtil";
import {
  NATURE,
  NOM,
  NOM_INSTITUTION,
  PRENOM,
  TYPE
} from "../../../modelForm/ISaisirRequetePageModel";
import { getFormValidationCarAutorisesEtNAtureObligatoireShema } from "../../commun/communValidation";
import "./../scss/RequerantForm.scss";

// Valeurs par défaut des champs
export const InstitutionnelFormDefaultValues = {
  [TYPE]: "",
  [NATURE]: "",
  [NOM_INSTITUTION]: "",
  [NOM]: "",
  [PRENOM]: ""
};

// Schéma de validation des champs
export const InstitutionnelFormValidationSchema =
  getFormValidationCarAutorisesEtNAtureObligatoireShema(NOM_INSTITUTION);

const InstitutionnelForm: React.FC<SubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);
  const [natureInactif, setNatureInactif] = useState<boolean>(true);

  const onChangeTypeInstitutionnel = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNatureInactif(e.target.value !== "AUTRE");
    if (e.target.value !== "AUTRE") {
      props.formik.setFieldValue(
        withNamespace(props.nom, NATURE),
        InstitutionnelFormDefaultValues[NATURE]
      );
    }
    props.formik.handleChange(e);
  };

  return (
    <div className="RequerantSousForm">
      <SelectField
        name={withNamespace(props.nom, TYPE)}
        label={getLibelle("Type")}
        options={TypeInstitutionnel.getAllEnumsAsOptions()}
        onChange={e => {
          onChangeTypeInstitutionnel(e);
        }}
      />
      {!natureInactif && (
        <InputField
          name={withNamespace(props.nom, NATURE)}
          label={getLibelle("Nature")}
          maxLength={NB_CARACT_MAX_SAISIE}
          disabled={natureInactif}
        />
      )}
      <InputField
        name={withNamespace(props.nom, NOM_INSTITUTION)}
        label={getLibelle("Nom institution")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={nomWithNamespace}
        label={getLibelle("Nom représentant")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e => sortieChampEnMajuscule(e, props.formik, nomWithNamespace)}
      />
      <InputField
        name={prenomWithNamespace}
        label={getLibelle("Prénom représentant")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e =>
          sortieChampPremiereLettreEnMajuscule(
            e,
            props.formik,
            prenomWithNamespace
          )
        }
      />
    </div>
  );
};

export default connect(InstitutionnelForm);
