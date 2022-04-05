import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  URL_ACCUEIL,
  URL_CONTEXT_APP,
  URL_MES_REQUETES_DELIVRANCE,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "../../../router/ReceUrls";
import { getUrlPrecedente } from "../../util/route/routeUtil";
import { getLibelle } from "../../util/Utils";

export const BoutonRetour: React.FC = () => {
  const history = useHistory();
  const [libelle, retourUrl] = getLibelleEtUrl(
    getUrlPrecedente(history.location.pathname)
  );

  return (
    <Link to={retourUrl} className="Bouton BoutonRetour" role="button">
      {`<< Retour ${libelle}`}
    </Link>
  );
};

export function getLibelleEtUrl(url: string) {
  switch (url) {
    case URL_CONTEXT_APP:
    case URL_ACCUEIL:
      return [getLibelle("Accueil"), URL_ACCUEIL];
    case URL_MES_REQUETES_DELIVRANCE:
      return [
        getLibelle("mes requêtes de délivrance"),
        URL_MES_REQUETES_DELIVRANCE
      ];
    case URL_REQUETES_DELIVRANCE_SERVICE:
      return [
        getLibelle("requête de service"),
        URL_REQUETES_DELIVRANCE_SERVICE
      ];
    case URL_RECHERCHE_REQUETE:
      return [getLibelle("recherche requête"), URL_RECHERCHE_REQUETE];
    default:
      return [getLibelle(""), URL_ACCUEIL];
  }
}