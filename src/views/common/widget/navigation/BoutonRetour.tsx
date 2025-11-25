import LiensRECE from "@router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE, INFO_PAGE_REQUETES_DELIVRANCE_SERVICE } from "@router/infoPages/InfoPagesEspaceDelivrance";
import { INFO_PAGE_RECHERCHE_REQUETE } from "@router/infoPages/InfoPagesEspaceRecherche";
import React, { useMemo } from "react";
import { MdReplay } from "react-icons/md";
import Bouton from "../../../../composants/commun/bouton/Bouton";
import { URL_ACCUEIL } from "../../../../router/infoPages/InfoPagesBase";
import GestionnaireFilAriane, { IElementFilAriane } from "../../../../utils/GestionnaireFilAriane";

export const BoutonRetour: React.FC = () => {
  const { titre, url }: IElementFilAriane = useMemo(
    () =>
      GestionnaireFilAriane.elementsFilAriane.niveau2
        ? GestionnaireFilAriane.elementsFilAriane.niveau1!
        : { titre: "Accueil", url: URL_ACCUEIL },
    [GestionnaireFilAriane.elementsFilAriane]
  );

  return (
    <Bouton
      lienVers={url}
      className="float-left flex items-center justify-center gap-2"
    >
      <MdReplay size={17} />
      {`Retour ${titre}`.toUpperCase()}
    </Bouton>
  );
};

const getLibelleEtUrl = (url: string) => {
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
};
