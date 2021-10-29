import { connect } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import { receUrl } from "../../../../../router/ReceUrls";
import "../scss/ChoixReponseReqInfo.scss";

export type ReponseReqInfoBoutonsProps = {
  setIsBrouillon: any;
} & FormikComponentProps;

const ReponseReqInfoBoutons: React.FC<ReponseReqInfoBoutonsProps> = props => {
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
          {getLibelle("Annuler")}
        </button>
        <button
          disabled={!props.formik.dirty}
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
