import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "@api/ApiManager";
import { GestionnaireFermeture } from "@util/GestionnaireFermeture";
import React, { useContext } from "react";
import { Outlet } from "react-router";
import MessageErreurConnexion from "../../../composants/miseEnPage/connexion/MessageErreurConnexion";
import FilAriane from "../../../composants/miseEnPage/corpsDePage/FilAriane";
import { IErreurConnexion, RECEContextData } from "../../../contexts/RECEContextProvider";
import LiensRECE from "../../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE } from "../../../router/infoPages/InfoPagesEspaceDelivrance";
import AfficherMessage from "../../../utils/AfficherMessage";

const getMessageErreur = (erreurConnexion: IErreurConnexion | null): string => {
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

const CorpsDePage: React.FC = () => {
  const { utilisateurConnecte, erreurConnexion } = useContext(RECEContextData);

  return (
    <main className="px-1 md:px-2 lg:px-4 2xl:px-8">
      {erreurConnexion || !utilisateurConnecte?.idArobas ? (
        <MessageErreurConnexion message={getMessageErreur(erreurConnexion)} />
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

export default CorpsDePage;
