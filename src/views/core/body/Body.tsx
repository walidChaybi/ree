import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "@api/ApiManager";
import { IErreurConnexion, RECEContextData } from "@core/contexts/RECEContext";
import { routesRece } from "@router/ReceRoutes";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { GestionnaireFermeture } from "@util/GestionnaireFermeture";
import { logError } from "@util/LogManager";
import { FilAriane } from "@widget/filAriane/FilAriane";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { PageMessage } from "../login/PageMessage";

const getMessageErreur = (erreurConnexion: IErreurConnexion | null, appliDejaOuverte: boolean) => {
  switch (true) {
    case appliDejaOuverte:
      return "L'application est déjà ouverte sur cet ordinateur";
    case erreurConnexion?.statut === HTTP_UNAUTHORIZED:
    case erreurConnexion?.statut === HTTP_FORBIDDEN:
      return "Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO.";
    case Boolean(erreurConnexion?.avecErreur):
      return "Votre compte utilisateur n'est pas actif - Veuillez vous adresser à votre administrateur RECE";
    default:
      logError({
        messageUtilisateur: "Impossible de récupérer les informations utilisateur via le service de login",
        error: { status: erreurConnexion?.statut }
      });
      return "Erreur Système";
  }
};

export const Body: React.FC = () => {
  const { utilisateurConnecte, erreurConnexion } = useContext(RECEContextData);
  const [appliDejaOuverte, setAppliDejaOuverte] = useState<boolean>(false);

  useEffect(() => {
    gestionnaireDoubleOuverture.lancerVerification(() => {
      setAppliDejaOuverte(true);
    });
  }, []);

  return (
    <main className="AppBody">
      {erreurConnexion || !utilisateurConnecte?.idSSO || appliDejaOuverte ? (
        <PageMessage message={getMessageErreur(erreurConnexion, appliDejaOuverte)} />
      ) : (
        <>
          {utilisateurConnecte?.idSSO && <GestionnaireFermeture urlRedirection={URL_MES_REQUETES_DELIVRANCE}></GestionnaireFermeture>}
          <FilAriane routes={routesRece} />
          <Outlet />
        </>
      )}
    </main>
  );
};
