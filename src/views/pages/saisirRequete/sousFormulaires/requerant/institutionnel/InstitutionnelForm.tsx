import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { TypeInstitutionnel } from "../../../../../../model/requete/v2/enum/TypeInstitutionnel";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../../common/widget/formulaire/champsSaisie/SelectField";
import { CARATERES_AUTORISES_MESSAGE } from "../../../../../common/widget/formulaire/FormulaireMessages";
import {
  sortieChampEnMajuscule,
  sortieChampPremiereLettreEnMajuscule
} from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import {
  NATURE,
  NOM,
  NOM_INSTITUTION,
  PRENOM,
  TYPE
} from "../../../modelForm/ISaisirRequetePageModel";
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
export const InstitutionnelFormValidationSchema = Yup.object()
  .shape({
    [TYPE]: Yup.string(),
    [NATURE]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [NOM_INSTITUTION]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [NOM]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
    [PRENOM]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    )
  })
  .test("natureObligatoire", function (value, error) {
    const type = value[TYPE] as string;
    const nature = value[NATURE] as string;

    const paramsError = {
      path: `${error.path}.nature`,
      message: getLibelle(
        'Saisie d\'une Nature est obligatoire pour le Type "Autre"'
      )
    };
    return type === "AUTRE" && nature == null
      ? this.createError(paramsError)
      : true;
  });

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
