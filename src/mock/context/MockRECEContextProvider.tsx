import { RECEContextProvider } from "@core/contexts/RECEContext";
import { ILoginApi } from "@core/login/LoginHook";
import React from "react";

type MockRECEContextProvider = {
  infosLoginOfficier?: ILoginApi;
};

const MockRECEContextProvider: React.FC<
  React.PropsWithChildren<MockRECEContextProvider>
> = ({ infosLoginOfficier, children }) => (
  <RECEContextProvider
    infosLoginOfficier={infosLoginOfficier || {}}
    estListeServicesChargee={true}
    estListeUtilisateursChargee={true}
  >
    {children}
  </RECEContextProvider>
);

export default MockRECEContextProvider;
