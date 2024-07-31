import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "@api/ApiManager";
import { routesRece } from "@router/ReceRoutes";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import {
  GestionnaireFermeture,
  appelRequetesASigner,
  traiteAppelRequeteASigner
} from "@util/GestionnaireFermeture";
import { logError } from "@util/LogManager";
import { ZERO, getLibelle } from "@util/Utils";
import { FilAriane } from "@widget/filAriane/FilAriane";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  OfficierContext,
  OfficierContextProps
} from "../contexts/OfficierContext";
import { PageMessage } from "../login/PageMessage";
import { RECEContext } from "./RECEContext";

export const Body: React.FC = () => {
  const [appliDejaOuverte, setAppliDejaOuverte] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    gestionnaireDoubleOuverture.lancerVerification(() => {
      setAppliDejaOuverte(true);
    });
  }, []);

  return (
    <>
      <main className="AppBody">
        <OfficierContext.Consumer>
          {officier =>
            officier?.officierDataState?.idSSO !== undefined ? (
              appliDejaOuverte ? (
                <PageMessage
                  message={getLibelle(
                    "L'application est déjà ouverte sur cet ordinateur"
                  )}
                />
              ) : (
                <RECEContext.Provider
                  value={{
                    isDirty,
                    setIsDirty
                  }}
                >
                  <GestionnaireFermeture
                    paramsFctAAppler={officier}
                    fctAAppeler={appelRequetesASigner}
                    fctTraitementResultat={traiteAppelRequeteASigner}
                    urlRedirection={URL_MES_REQUETES_DELIVRANCE}
                  ></GestionnaireFermeture>

                  <FilAriane routes={routesRece} />
                  <Outlet />
                </RECEContext.Provider>
              )
            ) : (
              <PageMessage message={getMessageLogin(officier)} />
            )
          }
        </OfficierContext.Consumer>
      </main>
    </>
  );
};

function getMessageLogin(officier: OfficierContextProps) {
  if (
    officier !== undefined &&
    officier.erreurState !== undefined &&
    (officier.erreurState.status === HTTP_UNAUTHORIZED ||
      officier.erreurState.status === HTTP_FORBIDDEN)
  ) {
    return getLibelle(
      "Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO."
    );
  } else if (
    officier !== undefined &&
    officier?.erreurState?.response?.body?.errors?.[ZERO]
  ) {
    return getLibelle(
      "Votre compte utilisateur n'est pas actif - Veuillez vous adresser à votre administrateur RECE"
    );
  } else if (officier !== undefined && officier.erreurState !== undefined) {
    logError({
      messageUtilisateur:
        "Impossible de récupérer les informations utilisateur via le service de login",
      error: officier.erreurState
    });
    return getLibelle("Erreur Système");
  } else {
    return getLibelle("Connexion en cours ...");
  }
}
