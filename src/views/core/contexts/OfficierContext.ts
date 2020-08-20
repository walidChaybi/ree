import React from "react";
import { IUtilisateurSSOApi } from "../LoginHook";

export const OfficierInLocalStorage = "officierData";

export type OfficierContextProps = IUtilisateurSSOApi | undefined;

export const OfficierContext = React.createContext<OfficierContextProps>(
  undefined
);
