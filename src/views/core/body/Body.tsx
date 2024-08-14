import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "@api/ApiManager";
import { RECEContext } from "@core/contexts/RECEContext";
import { ILoginApi } from "@core/login/LoginHook";
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

  const { infosLoginOfficier } = useContext(RECEContext);
  useEffect(() => {
    gestionnaireDoubleOuverture.lancerVerification(() => {
      setAppliDejaOuverte(true);
    });
  }, []);

  return (
    <main className="AppBody">
      {infosLoginOfficier.officierDataState?.idSSO !== undefined ? (
        appliDejaOuverte ? (
          <PageMessage
            message={getLibelle(
              "L'application est déjà ouverte sur cet ordinateur"
            )}
          />
        ) : (
          <>
            <GestionnaireFermeture
              urlRedirection={URL_MES_REQUETES_DELIVRANCE}
            ></GestionnaireFermeture>

            <FilAriane routes={routesRece} />
            <Outlet />
          </>
        )
      ) : (
        <PageMessage message={getMessageLogin(infosLoginOfficier)} />
      )}
    </main>
  );
};

function getMessageLogin(infosLoginOfficier: ILoginApi) {
  if (
    infosLoginOfficier !== undefined &&
    infosLoginOfficier.erreurState !== undefined &&
    (infosLoginOfficier.erreurState.status === HTTP_UNAUTHORIZED ||
      infosLoginOfficier.erreurState.status === HTTP_FORBIDDEN)
  ) {
    return getLibelle(
      "Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO."
    );
  } else if (infosLoginOfficier?.erreurState?.response?.body?.errors[ZERO]) {
    return getLibelle(
      "Votre compte utilisateur n'est pas actif - Veuillez vous adresser à votre administrateur RECE"
    );
  } else if (infosLoginOfficier.erreurState !== undefined) {
    logError({
      messageUtilisateur:
        "Impossible de récupérer les informations utilisateur via le service de login",
      error: infosLoginOfficier.erreurState
    });
    return getLibelle("Erreur Système");
  } else {
    return getLibelle("Connexion en cours ...");
  }
}
