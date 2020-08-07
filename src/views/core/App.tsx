import React from "react";
import "../../sass/_library.scss";
import "../../sass/_colors.scss";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./header/Header";
import { Body } from "./body/Body";
import { ToastContainer } from "react-toastify";
import { useLoginApi, IUtilisateurSSOApi } from "./LoginHook";

const officier: IUtilisateurSSOApi = {
  idSSO: "",
  nom: "",
  prenom: "",
  trigramme: "",
  mail: "",
  telephone: "",
  section: "",
  bureau: "",
  departement: "",
  service: ""
};

const officierMock: IUtilisateurSSOApi = {
  idSSO: "",
  nom: "Garisson",
  prenom: "Juliette",
  trigramme: "JGA",
  mail: "",
  telephone: "",
  service: "SCEC",
  departement: "Exploitation",
  bureau: "Bureau A38",
  section: "Section 2"
};

export const OfficierContext = React.createContext(officier);

const App: React.FC = () => {
  const login = useLoginApi();

  return (
    <Router>
      <div className="App">
        <OfficierContext.Provider
          value={login.dataState[0] ? login.dataState[0] : officierMock}
        >
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
