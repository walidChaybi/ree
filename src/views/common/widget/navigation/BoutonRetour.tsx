import React from "react";
import { Link, useHistory } from "react-router-dom";
import { RetourContext } from "../../../core/body/Body";
import {
  URL_ACCUEIL,
  URL_CONTEXT_APP,
  URL_MES_REQUETES,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_SERVICE
} from "../../../router/ReceUrls";
import { getUrlPrecedente } from "../../util/route/routeUtil";

export const BoutonRetour: React.FC = () => {
  const history = useHistory();
  let libelle = "";

  switch (getUrlPrecedente(history.location.pathname)) {
    case URL_CONTEXT_APP:
    case URL_ACCUEIL:
      libelle = "Accueil";
      break;
    case URL_MES_REQUETES:
    case URL_REQUETES_SERVICE:
      libelle = "espace délivrance";
      break;
    case URL_RECHERCHE_REQUETE:
      libelle = "recherche requête";
      break;
    default:
      libelle = "";
      break;
  }

  return (
    <RetourContext.Consumer>
      {retourUrl => (
        <Link to={retourUrl} className="Bouton BoutonRetour" role="button">
          {`<< Retour ${libelle}`}
        </Link>
      )}
    </RetourContext.Consumer>
  );
};
