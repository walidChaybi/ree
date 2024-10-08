import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "@api/ApiManager";
import { RECEContextData } from "@core/contexts/RECEContext";
import { routesRece } from "@router/ReceRoutes";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { GestionnaireFermeture } from "@util/GestionnaireFermeture";
import { logError } from "@util/LogManager";
import { ZERO, getLibelle } from "@util/Utils";
import { FilAriane } from "@widget/filAriane/FilAriane";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { PageMessage } from "../login/PageMessage";

export const Body: React.FC = () => {
  const [appliDejaOuverte, setAppliDejaOuverte] = useState<boolean>(false);

  const { utilisateurConnecte, erreurLogin } = useContext(RECEContextData);
  useEffect(() => {
    gestionnaireDoubleOuverture.lancerVerification(() => {
      setAppliDejaOuverte(true);
    });
  }, []);

  return (
    <main className="AppBody">
      {erreurLogin || !utilisateurConnecte?.idSSO || appliDejaOuverte ? (
        <PageMessage
          message={
            erreurLogin || !utilisateurConnecte?.idSSO
              ? getMessageLogin(erreurLogin)
              : getLibelle("L'application est déjà ouverte sur cet ordinateur")
          }
        />
      ) : (
        <>
          <GestionnaireFermeture
            urlRedirection={URL_MES_REQUETES_DELIVRANCE}
          ></GestionnaireFermeture>
          <FilAriane routes={routesRece} />
          <Outlet />
        </>
      )}
    </main>
  );
};

function getMessageLogin(erreurLogin: any) {
  if (
    erreurLogin?.status === HTTP_UNAUTHORIZED ||
    erreurLogin?.status === HTTP_FORBIDDEN
  ) {
    return getLibelle(
      "Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO."
    );
  } else if (erreurLogin?.response?.body?.errors[ZERO]) {
    return getLibelle(
      "Votre compte utilisateur n'est pas actif - Veuillez vous adresser à votre administrateur RECE"
    );
  } else if (erreurLogin) {
    logError({
      messageUtilisateur:
        "Impossible de récupérer les informations utilisateur via le service de login",
      error: erreurLogin
    });
    return getLibelle("Erreur Système");
  } else {
    return getLibelle("Connexion en cours ...");
  }
}
