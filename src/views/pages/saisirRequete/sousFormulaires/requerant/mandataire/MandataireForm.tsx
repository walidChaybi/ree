import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { TypeMandataireReq } from "../../../../../../model/requete/v2/enum/TypeMandataireReq";
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
  PRENOM,
  RAISON_SOCIALE,
  TYPE
} from "../../../modelForm/ISaisirRequetePageModel";
import "./../scss/RequerantForm.scss";

// Valeurs par défaut des champs
export const MandataireFormDefaultValues = {
  [TYPE]: "",
  [NATURE]: "",
  [RAISON_SOCIALE]: "",
  [NOM]: "",
  [PRENOM]: ""
};

// Schéma de validation des champs
export const MandataireFormValidationSchema = Yup.object()
  .shape({
    [TYPE]: Yup.string(),
    [NATURE]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [RAISON_SOCIALE]: Yup.string().matches(
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
        'La saisie d\'une Nature est obligatoire pour le Type "Autre"'
      )
    };
    return type === "AUTRE" && nature == null
      ? this.createError(paramsError)
      : true;
  });

const MandataireForm: React.FC<SubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);
  const [natureInactif, setNatureInactif] = useState<boolean>(true);

  const onChangeTypeMandataire = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNatureInactif(e.target.value !== "AUTRE");
    if (e.target.value !== "AUTRE") {
      props.formik.setFieldValue(
        withNamespace(props.nom, NATURE),
        MandataireFormDefaultValues[NATURE]
      );
    }
    props.formik.handleChange(e);
  };

  return (
    <div className="RequerantSousForm">
      <SelectField
        name={withNamespace(props.nom, TYPE)}
        label={getLibelle("Type")}
        options={TypeMandataireReq.getAllEnumsAsOptions()}
        onChange={e => {
          onChangeTypeMandataire(e);
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
        name={withNamespace(props.nom, RAISON_SOCIALE)}
        label={getLibelle("Raison sociale")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={nomWithNamespace}
        label={getLibelle("Nom mandataire")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e => sortieChampEnMajuscule(e, props.formik, nomWithNamespace)}
      />
      <InputField
        name={prenomWithNamespace}
        label={getLibelle("Prénom mandataire")}
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

export default connect(MandataireForm);
