/* istanbul ignore file */

import { ILoginApi } from "@core/login/LoginHook";
import React, { useState } from "react";

export interface IRECEContext {
  infosLoginOfficier: ILoginApi;
  estListeUtilisateursChargee: boolean;
  estListeServicesChargee: boolean;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

type RECEContextProviderProps = Omit<IRECEContext, "isDirty" | "setIsDirty">;

const RECEContext = React.createContext<IRECEContext>({} as IRECEContext);

const RECEContextProvider: React.FC<
  React.PropsWithChildren<RECEContextProviderProps>
> = ({
  infosLoginOfficier,
  estListeUtilisateursChargee,
  estListeServicesChargee,
  children
}) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);

  return (
    <RECEContext.Provider
      value={{
        infosLoginOfficier,
        estListeUtilisateursChargee,
        estListeServicesChargee,
        isDirty,
        setIsDirty
      }}
    >
      {children}
    </RECEContext.Provider>
  );
};

export { RECEContext, RECEContextProvider };
