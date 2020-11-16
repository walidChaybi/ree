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
import { AppUrls } from "../router/UrlManager";

const App: React.FC = () => {
  const login = useLoginApi();
  return (
    <Router>
      <div className="App">
        <OfficierContext.Provider value={login}>
          <OfficierContext.Consumer>
            {officier => (
              <GestionnaireFermeture
                paramsFctAAppler={officier}
                fctAAppeler={appelRequetesASigner}
                fctTraitementResultat={traiteAppelRequeteASigner}
                urlRedirection={AppUrls.ctxMesRequetesUrl}
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
  );
};

export default App;
