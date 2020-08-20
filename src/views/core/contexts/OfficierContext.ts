import React from "react";
import { IUtilisateurSSOApi } from "../LoginHook";

export const OfficierInLocalStorage = "officierData";

export function getDefaultOfficier(): IUtilisateurSSOApi {
  const defaultOfficier: IUtilisateurSSOApi = {
    idSSO: "",
    nom: "",
    prenom: "",
    trigramme: "",
    mail: "",
    telephone: "",
    section: "",
    bureau: "",
    departement: "",
    service: "",
  };

  const officierLocalStorage = localStorage.getItem(OfficierInLocalStorage);

  const officier: IUtilisateurSSOApi = officierLocalStorage
    ? JSON.parse(officierLocalStorage)
    : defaultOfficier;
  return officier;
}

export const OfficierContext = React.createContext(getDefaultOfficier());
