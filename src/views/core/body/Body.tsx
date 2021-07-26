import React, { useState } from "react";
import { GestionnaireDoubleOuverture } from "../../common/util/GestionnaireDoubleOuverture";
import { logError } from "../../common/util/LogManager";
import { storeRece } from "../../common/util/storeRece";
import { FilAriane } from "../../common/widget/filAriane/FilAriane";
import { routesRece } from "../../router/ReceRoutes";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import { RouterComponent } from "../../router/RouteComponent";
import {
  OfficierContext,
  OfficierContextProps
} from "../contexts/OfficierContext";
import { LoginPage } from "../login/LoginPage";

export const RetourContext = React.createContext(URL_ACCUEIL);
export const Body: React.FC = () => {
  const [retourState, setRetourState] = useState<string>(URL_ACCUEIL);
  storeRece.retourUrl = retourState;

  return (
    <>
      <main className="AppBody">
        <OfficierContext.Consumer>
          {officier =>
            officier?.officierDataState?.idSSO !== undefined ? (
              <RetourContext.Provider value={retourState}>
                <FilAriane
                  setRetourState={setRetourState}
                  routes={routesRece}
                />
                <RouterComponent />
              </RetourContext.Provider>
            ) : (
              <LoginPage messageLogin={getMessageLogin(officier)} />
            )
          }
        </OfficierContext.Consumer>
      </main>
    </>
  );
};

function getMessageLogin(officier: OfficierContextProps) {
  const codeErreurForbidden = 403;
  if (
    officier !== undefined &&
    officier.erreurState !== undefined &&
    officier.erreurState.status === codeErreurForbidden
  ) {
    return "pages.login.erreurAuthentifacition";
  } else if (GestionnaireDoubleOuverture.verifSiAppliDejaOuverte()) {
    return "pages.login.appliOuverte";
  } else if (officier !== undefined && officier.erreurState !== undefined) {
    logError({
      messageUtilisateur:
        "Impossible de récupérer les informations utilisateur via le service de login",
      error: officier.erreurState
    });
    return "pages.login.erreurSysteme";
  } else {
    return "pages.login.connexion";
  }
}
