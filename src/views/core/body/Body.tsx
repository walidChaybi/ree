import React, { useState } from "react";
import { RouterComponent } from "../../router/RouteComponent";
import { FilAriane } from "../../common/widget/filAriane/FilAriane";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import {
  OfficierContext,
  OfficierContextProps
} from "../contexts/OfficierContext";
import { LoginPage } from "../login/LoginPage";
import { logError } from "../../common/util/LogManager";

export const RetourContext = React.createContext(URL_ACCUEIL);
export const Body: React.FC = () => {
  const [retourState, setRetourState] = useState<string>(URL_ACCUEIL);

  return (
    <>
      <div className="AppBody">
        <OfficierContext.Consumer>
          {officier =>
            officier?.officierDataState?.idSSO !== undefined ? (
              <RetourContext.Provider value={retourState}>
                <FilAriane setRetourState={setRetourState} />
                <RouterComponent />
              </RetourContext.Provider>
            ) : (
              <LoginPage messageLogin={getMessageLogin(officier)} />
            )
          }
        </OfficierContext.Consumer>
      </div>
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
