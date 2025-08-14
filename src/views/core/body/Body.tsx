import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "@api/ApiManager";
import { IErreurConnexion, RECEContextData } from "@core/contexts/RECEContext";
import { GestionnaireFermeture } from "@util/GestionnaireFermeture";
import React, { useContext } from "react";
import { Outlet } from "react-router";
import FilAriane from "../../../composants/miseEnPage/corpsDePage/FilAriane";
import LiensRECE from "../../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE } from "../../../router/infoPages/InfoPagesEspaceDelivrance";
import AfficherMessage from "../../../utils/AfficherMessage";
import { PageMessage } from "../login/PageMessage";

const getMessageErreur = (erreurConnexion: IErreurConnexion | null) => {
  switch (true) {
    case erreurConnexion?.statut === HTTP_UNAUTHORIZED:
    case erreurConnexion?.statut === HTTP_FORBIDDEN:
      return "Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO.";
    case Boolean(erreurConnexion?.avecErreur):
      return "Votre compte utilisateur n'est pas actif - Veuillez vous adresser à votre administrateur RECE";
    default:
      AfficherMessage.erreur("Impossible de récupérer les informations utilisateur via le service de login");

      return "Erreur Système";
  }
};

export const Body: React.FC = () => {
  const { utilisateurConnecte, erreurConnexion } = useContext(RECEContextData);

  return (
    <main className="AppBody">
      {erreurConnexion || !utilisateurConnecte?.idArobas ? (
        <PageMessage message={getMessageErreur(erreurConnexion)} />
      ) : (
        <>
          {utilisateurConnecte?.idArobas && (
            <GestionnaireFermeture urlRedirection={LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url)} />
          )}
          <FilAriane />
          <Outlet />
        </>
      )}
    </main>
  );
};
