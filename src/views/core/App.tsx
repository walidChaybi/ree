/* istanbul ignore file */

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
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
import { logError } from "../common/util/LogManager";
import { MigratorV1V2 } from "../common/util/migration/MigratorV1V2";
import { storeRece } from "../common/util/storeRece";
import { URL_MES_REQUETES_DELIVRANCE } from "../router/ReceUrls";
import "./App.scss";
import { Body } from "./body/Body";
import { OfficierContext } from "./contexts/OfficierContext";
import { Header } from "./header/Header";
import { useLoginApi } from "./login/LoginHook";

// ReceDatepicker Locale
registerLocale("fr", fr);
setDefaultLocale("fr");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#03476e"
    },
    secondary: {
      main: "#0579be"
    }
  }
});

const App: React.FC = () => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(true);
  const login = useLoginApi();

  useEffect(() => {
    MigratorV1V2.init();
    loadFonts();
  }, []);

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
    <ThemeProvider theme={theme}>
      <SeulementNavigateur navigateurs={[FIREFOX, CHROME]}>
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
                      urlRedirection={URL_MES_REQUETES_DELIVRANCE}
                    ></GestionnaireFermeture>
                  )}
                </OfficierContext.Consumer>
                <Header />
                {!operationEnCours && <Body />}
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
    </ThemeProvider>
  );
};

const loadFonts = () => {
  // Ajout des polices dynamiquement pour pouvoir être copié dans fenêtre externe
  const notoSansRegular = new FontFace(
    "NotoSansUI-Regular",
    `url(${process.env.PUBLIC_URL}/NotoSansUI-Regular.ttf)`
  );
  notoSansRegular
    .load()
    .then(loadedFace => {
      document.fonts.add(loadedFace);
    })
    .catch(error => {
      erreurChargementPolice("Regular");
    });
  const notoSansBold = new FontFace(
    "NotoSansUI-Bold",
    `url(${process.env.PUBLIC_URL}/NotoSansUI-Bold.ttf)`
  );
  notoSansBold
    .load()
    .then(loadedFace => {
      document.fonts.add(loadedFace);
    })
    .catch(error => {
      erreurChargementPolice("Bold");
    });
};

const erreurChargementPolice = (typePolice: string) => {
  return logError({
    messageUtilisateur: "Impossible de charger NotoSansUI-" + typePolice
  });
};

export default App;
