import React from "react";
import { ILoginApi } from "../login/LoginHook";

export const OfficierInLocalStorage = "officierData";

export type OfficierContextProps = ILoginApi | undefined;

export const OfficierContext = React.createContext<OfficierContextProps>(
  undefined
);
