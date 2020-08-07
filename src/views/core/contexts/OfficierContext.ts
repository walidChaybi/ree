import React from "react";
import { IUtilisateurSSOApi } from "../LoginHook";

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

export const officierContextMock: IUtilisateurSSOApi = {
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
