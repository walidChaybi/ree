import { receUrl, URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../scss/ReponseReqInfo.scss";

export type ComponentProps = {
  formulaireDisabled: boolean;
  retourVisible?: boolean;
  affichageBoutonPrendreEnCharge?: boolean;
  onclickPrendreEnCharge?: () => void;
};

type BoutonsReponseReqInfoProps = ComponentProps & FormikComponentProps;

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
        {props.retourVisible && (
          <Bouton
            type="button"
            aria-label={libelleRetour}
            id="boutonAnnuler"
            onClick={() => {
              handleAnnuler();
            }}
          >
            {libelleRetour}
          </Bouton>
        )}
        {!props.affichageBoutonPrendreEnCharge && (
          <Bouton
            disabled={props.formulaireDisabled || !props.formik.isValid}
            aria-label={getLibelle("Envoyer la réponse")}
            type="button"
            id="boutonEnvoyer"
            onClick={() => {
              props.formik.submitForm();
            }}
          >
            {getLibelle("Envoyer la réponse")}
          </Bouton>
        )}
        {props.affichageBoutonPrendreEnCharge && (
          <Bouton
            type="button"
            id="boutonPrendreEnCharge"
            aria-label={getLibelle("Prendre en charge")}
            onClick={props.onclickPrendreEnCharge}
          >
            {getLibelle("Prendre en charge")}
          </Bouton>
        )}
      </div>
    </>
  );
};

export default connect<ComponentProps>(ReponseReqInfoBoutons);
