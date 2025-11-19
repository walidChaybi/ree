import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { REPONSE } from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import "../scss/ReponseReqInfo.scss";
import { ReponseReqInfoProps } from "./ReponseReqInfoForm";

export type ReponseReqInfoSubFormProps = FormikComponentProps & ReponseReqInfoProps;

const LIBELLE = "libelle";
const CORPS_MAIL = "corpsMail";
const NB_LIGNE_CORPS_MAIL = 20;
const NB_CARACTERES_CORPS_MAIL = 8000;

// Valeurs par défaut des champs
export const DefaultValuesReponseInfoSubForm = {
  [LIBELLE]: "",
  [CORPS_MAIL]: ""
};

export interface IReponseInfoSubFormValue {
  [LIBELLE]: string;
  [CORPS_MAIL]: string;
}

export const ValidationSchemaReponseInfoSubForm = Yup.object({
  [LIBELLE]: Yup.string().required("Merci de choisir une réponse"),
  [CORPS_MAIL]: Yup.string().required("Obligatoire").max(NB_CARACTERES_CORPS_MAIL, "Le nombre de caractères maximal est 8000")
});

const ReponseReqInfoSubForm: React.FC<ReponseReqInfoSubFormProps> = ({ reponse, formik, formulaireDisabled }) => {
  const libelleWithNamespace = `${REPONSE}.${LIBELLE}`;
  const corpsMailWithNamespace = `${REPONSE}.${CORPS_MAIL}`;

  useEffect(() => {
    if (reponse?.libelle) {
      formik.setFieldValue(libelleWithNamespace, reponse.libelle);
    }
    if (reponse?.corpsMail || reponse?.corpsMail === "") {
      formik.setFieldValue(corpsMailWithNamespace, reponse.corpsMail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reponse]);

  return (
    <>
      <InputField
        name={libelleWithNamespace}
        label={"Libellé de la réponse"}
        disabled={true}
      />
      <InputField
        name={corpsMailWithNamespace}
        label={"Mail de la réponse"}
        component={"textarea"}
        maxLength={(NB_CARACTERES_CORPS_MAIL + 1).toString()}
        rows={NB_LIGNE_CORPS_MAIL}
        disabled={formulaireDisabled}
      />
    </>
  );
};

export default connect(ReponseReqInfoSubForm);
