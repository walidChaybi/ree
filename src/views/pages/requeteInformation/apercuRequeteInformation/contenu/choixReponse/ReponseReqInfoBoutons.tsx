import { connect } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getLibelle } from "../../../../../common/util/Utils";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { receUrl, URL_RECHERCHE_REQUETE } from "../../../../../router/ReceUrls";
import "../scss/ReponseReqInfo.scss";

export type BoutonsReponseReqInfoProps = {
  formulaireDisabled: boolean;
} & FormikComponentProps;

const ReponseReqInfoBoutons: React.FC<BoutonsReponseReqInfoProps> = props => {
  const history = useHistory();
  const [libelleRetour, setLibelleRetour] = useState<string>();

  useEffect(() => {
    if (receUrl.getUrlCourante(history).includes(URL_RECHERCHE_REQUETE)) {
      setLibelleRetour(getLibelle("Retour rechercher une requête"));
    } else {
      setLibelleRetour(getLibelle("Retour espace information"));
    }
  }, [history]);

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
          {libelleRetour}
        </button>
        <button
          disabled={props.formulaireDisabled || !props.formik.isValid}
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
