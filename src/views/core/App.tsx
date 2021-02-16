/* istanbul ignore file */

import React from "react";
import "../../sass/_library.scss";
import "../../sass/_colors.scss";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./header/Header";
import { Body } from "./body/Body";
import { ToastContainer } from "react-toastify";
import { useLoginApi } from "./login/LoginHook";
import { OfficierContext } from "./contexts/OfficierContext";
import {
  GestionnaireFermeture,
  appelRequetesASigner,
  traiteAppelRequeteASigner
} from "../common/util/GestionnaireFermeture";
import { URL_MES_REQUETES } from "../router/ReceUrls";
import { storeRece } from "../common/util/storeRece";
import { ErrorManager } from "../common/util/ErrorManager";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
// ReceDatepicker Locale
registerLocale("fr", fr);
setDefaultLocale("fr");

const App: React.FC = () => {
  const login = useLoginApi();

  return (
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
  );
};

export default App;
