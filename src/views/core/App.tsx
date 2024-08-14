/* istanbul ignore file */

import { GestionnaireCacheApi } from "@api/appels/cache/GestionnaireCacheApi";
import { GestionnaireNomenclature } from "@api/nomenclature/GestionnaireNomenclature";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { receRouter } from "@router/ReceRouter";
import "@scss/_colors.scss";
import "@scss/_library.scss";
import {
  CHROME,
  FIREFOX,
  SeulementNavigateur
} from "@util/detectionNavigateur/DetectionNavigateur";
import { ErrorManager } from "@util/ErrorManager";
import { logError } from "@util/LogManager";
import { TOASTCONTAINER_PRINCIPAL } from "@util/messageManager";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { storeRece } from "@util/storeRece";
import fr from "date-fns/locale/fr";
import React, { useEffect, useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { RECEContextProvider } from "./contexts/RECEContext";
import { useLoginApi } from "./login/LoginHook";

// ReceDatepicker Locale
registerLocale("fr", fr);
setDefaultLocale("fr");

const theme = createTheme({
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
  const [estListeUtilisateursChargee, setEstListeUtilisateursChargee] =
    useState<boolean>(false);
  const [estListeServicesChargee, setEstListeServicesChargee] =
    useState<boolean>(false);

  const login = useLoginApi();

  useEffect(() => {
    GestionnaireARetraiterDansSaga.init();
    chargerPolices();
  }, []);

  useEffect(() => {
    if (!storeRece.utilisateurCourant && login.officierDataState) {
      //A déplacer dans le contexte
      storeRece.utilisateurCourant = login.officierDataState;
      Promise.all([
        GestionnaireNomenclature.chargerToutesLesNomenclatures(),
        GestionnaireCacheApi.chargerTousLesDecrets()
      ]).finally(() => setOperationEnCours(false));

      GestionnaireCacheApi.chargerTousLesUtilisateurs().finally(() =>
        setEstListeUtilisateursChargee(true)
      );
      GestionnaireCacheApi.chargerTousLesServices().finally(() =>
        setEstListeServicesChargee(true)
      );
    }
  }, [login.officierDataState]);

  useEffect(() => {
    if (login.erreurState) {
      setOperationEnCours(false);
    }
  }, [login.erreurState]);

  return (
    <ThemeProvider theme={theme}>
      <SeulementNavigateur
        navigateurs={
          process.env.NODE_ENV === "development" ? [FIREFOX, CHROME] : [FIREFOX]
        }
      >
        <ErrorManager>
          <div className="App">
            {!operationEnCours && (
              <>
                <ToastContainer
                  containerId={TOASTCONTAINER_PRINCIPAL}
                  className={"toast-container"}
                  position="top-center"
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick={true}
                  rtl={false}
                  draggable={true}
                  pauseOnHover={true}
                  enableMultiContainer={true}
                />
                <RECEContextProvider
                  infosLoginOfficier={login}
                  estListeUtilisateursChargee={estListeUtilisateursChargee}
                  estListeServicesChargee={estListeServicesChargee}
                >
                  <RouterProvider router={receRouter} />
                </RECEContextProvider>
              </>
            )}
          </div>
        </ErrorManager>
      </SeulementNavigateur>
    </ThemeProvider>
  );
};

const chargerPolices = () => {
  // Ajout des polices dynamiquement pour pouvoir être copié dans fenêtre externe
  const notoSansRegular = new FontFace(
    "NotoSansUI-Regular",
    `url(${process.env.PUBLIC_URL}/NotoSansUI-Regular.ttf)`
  );
  notoSansRegular
    .load()
    .then((loadedFace) => {
      document.fonts.add(loadedFace);
    })
    .catch((error) => {
      erreurChargementPolice("Regular");
    });
  const notoSansBold = new FontFace(
    "NotoSansUI-Bold",
    `url(${process.env.PUBLIC_URL}/NotoSansUI-Bold.ttf)`
  );
  notoSansBold
    .load()
    .then((loadedFace) => {
      document.fonts.add(loadedFace);
    })
    .catch((error) => {
      erreurChargementPolice("Bold");
    });
};

const erreurChargementPolice = (typePolice: string) => {
  return logError({
    messageUtilisateur: "Impossible de charger NotoSansUI-" + typePolice
  });
};

export default App;
