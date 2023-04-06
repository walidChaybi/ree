import ChoixPocopas from "@composant/formulaire/choixPocopas/ChoixPocopas";
import {
  LIEN_REQUERANT,
  NATURE_ACTE,
  REGISTRE
} from "@composant/formulaire/ConstantesNomsForm";
import { getLibelle } from "@util/Utils";
import {
  LIEN_REQUERANT_OBLIGATOIRE,
  NATURE_ACTE_OBLIGATOIRE,
  REGISTRE_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import { ISubForm, SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import NatureActeEtLienRequerantForm from "../acteATranscrireEtLienRequerant/NatureActeEtLienRequerant";
import "./RequeteForm.scss";

// Valeurs par défaut des champs
export const RequeteFormDefaultValues = {
  [NATURE_ACTE]: "",
  [LIEN_REQUERANT]: "",
  [REGISTRE]: ""
};

export const RequeteFormValidationSchema = Yup.object().shape({
  [NATURE_ACTE]: Yup.string().required(NATURE_ACTE_OBLIGATOIRE),
  [LIEN_REQUERANT]: Yup.string().required(LIEN_REQUERANT_OBLIGATOIRE),
  [REGISTRE]: Yup.string().required(REGISTRE_OBLIGATOIRE)
});

const RequeteForm: React.FC<SubFormProps> = props => {
  return (
    <div className="RequeteForm">
      <NatureActeEtLienRequerantForm
        key={props.nom}
        nom={props.nom}
        titre={getLibelle("Acte à transcrire")}
      />
      <ChoixPocopas nom={props.nom} />
    </div>
  );
};

export default connect<ISubForm>(RequeteForm);
