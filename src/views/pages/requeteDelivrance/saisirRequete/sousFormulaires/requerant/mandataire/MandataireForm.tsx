import { connect } from "formik";
import React, { useState } from "react";
import { TypeMandataireReq } from "../../../../../../../model/requete/enum/TypeMandataireReq";
import { getLibelle } from "../../../../../../common/util/Utils";
import { InputField } from "../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../../../common/widget/formulaire/champsSaisie/SelectField";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../../common/widget/formulaire/utils/FormUtil";
import {
  NATURE,
  NOM,
  PRENOM,
  RAISON_SOCIALE,
  TYPE
} from "../../../modelForm/ISaisirRequetePageModel";
import { getBlockRaisonSocialeNomPrenom } from "../../commun/communForm";
import { getFormValidationCarAutorisesEtNAtureObligatoireShema } from "../../commun/communValidation";
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
export const MandataireFormValidationSchema =
  getFormValidationCarAutorisesEtNAtureObligatoireShema(RAISON_SOCIALE);
const MandataireForm: React.FC<SubFormProps> = props => {
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);
  const raisonSocialeWithNamespace = withNamespace(props.nom, RAISON_SOCIALE);
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
      {getBlockRaisonSocialeNomPrenom(
        raisonSocialeWithNamespace,
        getLibelle("Raison sociale"),
        nomWithNamespace,
        getLibelle("Nom mandataire"),
        prenomWithNamespace,
        getLibelle("Prénom mandataire"),
        props.formik
      )}
    </div>
  );
};

export default connect(MandataireForm);
