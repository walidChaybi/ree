/* istanbul ignore file */

import fr from "date-fns/locale/fr";
import React, { useEffect, useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GestionnaireCacheApi } from "../../api/appels/cache/GestionnaireCacheApi";
import { GestionnaireNomenclature } from "../../api/nomenclature/GestionnaireNomenclature";
import "../../scss/_colors.scss";
import "../../scss/_library.scss";
import {
  CHROME,
  FIREFOX,
  SeulementNavigateur
} from "../common/util/detectionNavigateur/DetectionNavigateur";
import { ErrorManager } from "../common/util/ErrorManager";
import {
  appelRequetesASigner,
  GestionnaireFermeture,
  traiteAppelRequeteASigner
} from "../common/util/GestionnaireFermeture";
import { storeRece } from "../common/util/storeRece";
import { URL_MES_REQUETES } from "../router/ReceUrls";
import "./App.scss";
import { Body } from "./body/Body";
import { OfficierContext } from "./contexts/OfficierContext";
import { Header } from "./header/Header";
import { useLoginApi } from "./login/LoginHook";

// ReceDatepicker Locale
registerLocale("fr", fr);
setDefaultLocale("fr");

const App: React.FC = () => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(true);
  const login = useLoginApi();

  useEffect(() => {
    if (login.officierDataState) {
      Promise.all([
        GestionnaireNomenclature.chargerToutesLesNomenclatures(),
        GestionnaireCacheApi.chargerTousLesUtilisateurs(),
        GestionnaireCacheApi.chargerToutesLesEntites(),
        GestionnaireCacheApi.chargerTousLesDecrets()
      ]).then(values => {
        setOperationEnCours(false);
      });
    }
  }, [login.officierDataState]);

  useEffect(() => {
    if (login.erreurState) {
      setOperationEnCours(false);
    }
  }, [login.erreurState]);

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
                    urlRedirection={URL_MES_REQUETES}
                  ></GestionnaireFermeture>
                )}
              </OfficierContext.Consumer>
              <Header />
              {(!operationEnCours) && <Body />}
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

export default App;
