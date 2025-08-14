import { getUrlPrecedente } from "@util/route/UrlUtil";
import React from "react";
import { Link, useLocation } from "react-router";
import LiensRECE from "../../../../router/LiensRECE";
import { URL_ACCUEIL } from "../../../../router/infoPages/InfoPagesBase";
import {
  INFO_PAGE_MES_REQUETES_DELIVRANCE,
  INFO_PAGE_REQUETES_DELIVRANCE_SERVICE
} from "../../../../router/infoPages/InfoPagesEspaceDelivrance";
import { INFO_PAGE_RECHERCHE_REQUETE } from "../../../../router/infoPages/InfoPagesEspaceRecherche";

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
    case LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url):
      return ["mes requêtes de délivrance", LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url)];
    case LiensRECE.genererLien(INFO_PAGE_REQUETES_DELIVRANCE_SERVICE.url):
      return ["requête de service", LiensRECE.genererLien(INFO_PAGE_REQUETES_DELIVRANCE_SERVICE.url)];
    case LiensRECE.genererLien(INFO_PAGE_RECHERCHE_REQUETE.url):
      return ["recherche requête", LiensRECE.genererLien(INFO_PAGE_RECHERCHE_REQUETE.url)];
    default:
      return ["", URL_ACCUEIL];
  }
}
