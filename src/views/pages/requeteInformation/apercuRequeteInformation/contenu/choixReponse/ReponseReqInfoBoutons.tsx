import { connect } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { getLibelle } from "../../../../../common/util/Utils";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { receUrl } from "../../../../../router/ReceUrls";
import "../scss/ReponseReqInfo.scss";

const ReponseReqInfoBoutons: React.FC<FormikComponentProps> = props => {
  const history = useHistory();

  const handleAnnuler = () => {
    receUrl.goBack(history);
  };

  return (
    <>
      <div className="Boutons">
        <button
          type="button"
          id="boutonAnnuler"
          onClick={() => {
            handleAnnuler();
          }}
        >
          {getLibelle("Retour espace information")}
        </button>
        <button
          disabled={!props.formik.isValid}
          type="button"
          id="boutonEnvoyer"
          onClick={() => {
            props.formik.submitForm();
          }}
        >
          {getLibelle("Envoyer la réponse")}
        </button>
      </div>
    </>
  );
};

export default connect(ReponseReqInfoBoutons);
