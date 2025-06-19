import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";

import { goBack } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../scss/ReponseReqInfo.scss";

type ComponentProps = {
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
      setLibelleRetour("Retour rechercher une requête");
    } else {
      setLibelleRetour("Retour espace information");
    }
  }, [location]);

  const handleAnnuler = () => {
    goBack(navigate);
  };

  return (
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
          aria-label={"Envoyer la réponse"}
          type="button"
          id="boutonEnvoyer"
          onClick={() => {
            props.formik.submitForm();
          }}
        >
          {"Envoyer la réponse"}
        </BoutonDoubleSubmit>
      )}
      {props.affichageBoutonPrendreEnCharge && (
        <BoutonDoubleSubmit
          type="button"
          id="boutonPrendreEnCharge"
          aria-label={"Prendre en charge"}
          onClick={props.onclickPrendreEnCharge}
        >
          {"Prendre en charge"}
        </BoutonDoubleSubmit>
      )}
    </div>
  );
};

export default connect<ComponentProps>(ReponseReqInfoBoutons);
