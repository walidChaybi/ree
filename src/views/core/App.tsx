/* v8 ignore start */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@scss/_colors.scss";
import "@scss/_library.scss";
import { FIREFOX, SeulementNavigateur } from "@util/detectionNavigateur/DetectionNavigateur";
import { ErrorManager } from "@util/ErrorManager";
import { DIX_MILLE } from "@util/Utils";
import fr from "date-fns/locale/fr";
import React from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ToastContainer } from "react-toastify";
import { ConteneurParentModales } from "../../composants/commun/conteneurs/modale/ConteneurModale";
import ProtectionDoubleOuverture from "../../composants/commun/conteneurs/ProtectionDoubleOuverture";
import "../../index.css";
import RouterRECE from "../../router/RouterRECE";
import { TOASTCONTAINER_PRINCIPAL } from "../../utils/AfficherMessage";
import "./App.scss";
import { RECEContextProvider } from "./contexts/RECEContext";

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
  return (
    <ThemeProvider theme={theme}>
      <SeulementNavigateur navigateurs={[FIREFOX]}>
        <ProtectionDoubleOuverture>
          <ErrorManager>
            <div className="App">
              <RECEContextProvider>
                <>
                  <ToastContainer
                    containerId={TOASTCONTAINER_PRINCIPAL}
                    className={"toast-container"}
                    position="top-center"
                    newestOnTop={true}
                    closeOnClick={true}
                    rtl={false}
                    draggable={true}
                    pauseOnHover={true}
                    autoClose={DIX_MILLE}
                  />
                  <RouterRECE />
                  {/* <RouterProvider router={receRouter} /> */}
                  <ConteneurParentModales />
                </>
              </RECEContextProvider>
            </div>
          </ErrorManager>
        </ProtectionDoubleOuverture>
      </SeulementNavigateur>
    </ThemeProvider>
  );
};

export default App;
/* v8 ignore stop */
