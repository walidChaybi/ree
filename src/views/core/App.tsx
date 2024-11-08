/* v8 ignore start */
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
import { TOASTCONTAINER_PRINCIPAL } from "@util/messageManager";
import fr from "date-fns/locale/fr";
import React from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../../index.css";
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
      <SeulementNavigateur
        navigateurs={
          process.env.NODE_ENV === "development" ? [FIREFOX, CHROME] : [FIREFOX]
        }
      >
        <ErrorManager>
          <div className="App">
            <RECEContextProvider>
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
                <RouterProvider router={receRouter} />
              </>
            </RECEContextProvider>
          </div>
        </ErrorManager>
      </SeulementNavigateur>
    </ThemeProvider>
  );
};

export default App;
/* v8 ignore end */
