import { URL_ACCUEIL, URL_MES_REQUETES_DELIVRANCE, URL_RECHERCHE_REQUETE, URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { getUrlPrecedente } from "@util/route/UrlUtil";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const BoutonRetour: React.FC = () => {
  const location = useLocation();
  const [libelle, retourUrl] = getLibelleEtUrl(getUrlPrecedente(location.pathname));

  return (
    <Link
      to={retourUrl}
      className="Bouton BoutonRetour"
    >
      {`<< Retour ${libelle}`}
    </Link>
  );
};

export function getLibelleEtUrl(url: string) {
  switch (url) {
    case URL_ACCUEIL:
      return ["Accueil", URL_ACCUEIL];
    case URL_MES_REQUETES_DELIVRANCE:
      return ["mes requêtes de délivrance", URL_MES_REQUETES_DELIVRANCE];
    case URL_REQUETES_DELIVRANCE_SERVICE:
      return ["requête de service", URL_REQUETES_DELIVRANCE_SERVICE];
    case URL_RECHERCHE_REQUETE:
      return ["recherche requête", URL_RECHERCHE_REQUETE];
    default:
      return ["", URL_ACCUEIL];
  }
}
