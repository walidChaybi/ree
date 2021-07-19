/* istanbul ignore file */

import fr from "date-fns/locale/fr";
import React, { useEffect } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  getTousLesUtilisateurs,
  getToutesLesEntiteRattachement
} from "../../api/appels/agentApi";
import "../../scss/_colors.scss";
import "../../scss/_library.scss";
import {
  CHROME,
  FIREFOX,
  SeulementNavigateur
} from "../common/util/detectionNavigateur/DetectionNavigateur";
import { ErrorManager } from "../common/util/ErrorManager";
import { FeatureFlag } from "../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../common/util/featureFlag/gestionnaireFeatureFlag";
import {
  appelRequetesASigner,
  GestionnaireFermeture,
  traiteAppelRequeteASigner
} from "../common/util/GestionnaireFermeture";
import { logError } from "../common/util/LogManager";
import { storeRece } from "../common/util/storeRece";
import { URL_MES_REQUETES, URL_MES_REQUETES_V2 } from "../router/ReceUrls";
import "./App.scss";
import { Body } from "./body/Body";
import { OfficierContext } from "./contexts/OfficierContext";
import { Header } from "./header/Header";
import { useLoginApi } from "./login/LoginHook";

// ReceDatepicker Locale
registerLocale("fr", fr);
setDefaultLocale("fr");

const PLAGE_IMPORT = 100;

const etape2 = gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2);

const App: React.FC = () => {
  const login = useLoginApi();
  useEffect(() => {
    cacheUtilisateurs(0);
    cacheEntites(0);
  }, []);
  return (
    <SeulementNavigateur
      navigateurs={
        process.env.NODE_ENV === "development" ? [FIREFOX, CHROME] : [FIREFOX]
      }
    >
      <ErrorManager>
        <Router>
          <div className="App">
            <OfficierContext.Provider value={login}>
              <OfficierContext.Consumer>
                {officier => {
                  storeRece.utilisateurCourant = officier?.officierDataState;
                  return null;
                }}
              </OfficierContext.Consumer>
              <OfficierContext.Consumer>
                {officier => (
                  <GestionnaireFermeture
                    paramsFctAAppler={officier}
                    fctAAppeler={appelRequetesASigner}
                    fctTraitementResultat={traiteAppelRequeteASigner}
                    urlRedirection={
                      etape2 ? URL_MES_REQUETES_V2 : URL_MES_REQUETES
                    }
                  ></GestionnaireFermeture>
                )}
              </OfficierContext.Consumer>
              <Header />
              <Body />
              <ToastContainer
                className={"toast-container"}
                position="top-center"
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                draggable={true}
                pauseOnHover={true}
              />
            </OfficierContext.Provider>
          </div>
        </Router>
      </ErrorManager>
    </SeulementNavigateur>
  );
};

export function cacheUtilisateurs(page: number) {
  getTousLesUtilisateurs(`${page}-${PLAGE_IMPORT}`, true)
    .then(utilisateurs => {
      storeRece.listeUtilisateurs = [
        ...storeRece.listeUtilisateurs,
        ...utilisateurs.body.data
      ];
      if (
        utilisateurs.headers &&
        utilisateurs.headers.link &&
        utilisateurs.headers.link.indexOf(`rel="next"`) > 0
      ) {
        cacheUtilisateurs(page + 1);
      }
    })
    .catch(error => {
      logError({
        messageUtilisateur: "Impossible de récupérer les utilisateurs",
        error
      });
    });
}

export function cacheEntites(page: number) {
  getToutesLesEntiteRattachement(`${page}-${PLAGE_IMPORT}`)
    .then(entites => {
      storeRece.listeEntite = [...storeRece.listeEntite, ...entites.body.data];
      if (
        entites.headers &&
        entites.headers.link &&
        entites.headers.link.indexOf(`rel="next"`) > 0
      ) {
        cacheEntites(page + 1);
      }
    })
    .catch(error => {
      logError({
        messageUtilisateur: "Impossible de récupérer les entités",
        error
      });
    });
}

export default App;
