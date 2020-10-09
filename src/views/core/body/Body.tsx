import React, { useState } from "react";
import { RouterComponent } from "../../router/RouteComponent";
import { FilAriane } from "../../common/widget/filAriane/FilAriane";
import { AppUrls } from "../../router/UrlManager";
import {
  OfficierContext,
  OfficierContextProps,
} from "../contexts/OfficierContext";
import { LoginPage } from "../login/LoginPage";

export const RetourContext = React.createContext(AppUrls.ctxAccueilUrl);
export const Body: React.FC = () => {
  const [retourState, setRetourState] = useState<string>(AppUrls.ctxAccueilUrl);

  return (
    <>
      <div className="AppBody">
        <OfficierContext.Consumer>
          {(officier) =>
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
    return "pages.login.erreurSysteme";
  } else {
    return "pages.login.connexion";
  }
}
