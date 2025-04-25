import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { goBack } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../scss/ReponseReqInfo.scss";

export type ComponentProps = {
  formulaireDisabled: boolean;
  retourVisible?: boolean;
  affichageBoutonPrendreEnCharge?: boolean;
  onclickPrendreEnCharge?: () => void;
};

type BoutonsReponseReqInfoProps = ComponentProps & FormikComponentProps;

const ReponseReqInfoBoutons: React.FC<BoutonsReponseReqInfoProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [libelleRetour, setLibelleRetour] = useState<string>();

  useEffect(() => {
    if (location.pathname.includes(URL_RECHERCHE_REQUETE)) {
      setLibelleRetour(getLibelle("Retour rechercher une requête"));
    } else {
      setLibelleRetour(getLibelle("Retour espace information"));
    }
  }, [location]);

  const handleAnnuler = () => {
    goBack(navigate);
  };

  return (
    <>
      <div className="Boutons">
        {props.retourVisible && (
          <BoutonDoubleSubmit
            type="button"
            aria-label={libelleRetour}
            id="boutonAnnuler"
            onClick={() => {
              handleAnnuler();
            }}
          >
            {libelleRetour}
          </BoutonDoubleSubmit>
        )}
        {!props.affichageBoutonPrendreEnCharge && (
          <BoutonDoubleSubmit
            disabled={props.formulaireDisabled || !props.formik.isValid}
            aria-label={getLibelle("Envoyer la réponse")}
            type="button"
            id="boutonEnvoyer"
            onClick={() => {
              props.formik.submitForm();
            }}
          >
            {getLibelle("Envoyer la réponse")}
          </BoutonDoubleSubmit>
        )}
        {props.affichageBoutonPrendreEnCharge && (
          <BoutonDoubleSubmit
            type="button"
            id="boutonPrendreEnCharge"
            aria-label={getLibelle("Prendre en charge")}
            onClick={props.onclickPrendreEnCharge}
          >
            {getLibelle("Prendre en charge")}
          </BoutonDoubleSubmit>
        )}
      </div>
    </>
  );
};

export default connect<ComponentProps>(ReponseReqInfoBoutons);
