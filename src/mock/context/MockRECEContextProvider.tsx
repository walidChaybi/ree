import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { servicesALL } from "@mock/data/servicesALL";
import { IOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import React, { useState } from "react";

interface IMockRECEContextProviderProps {
  utilisateurConnecte?: IOfficier;
  utilisateurs?: IUtilisateur[];
  services?: IService[];
  decrets?: IDecret[];
  erreurLogin?: any;
}

const MockRECEContextProvider: React.FC<React.PropsWithChildren<IMockRECEContextProviderProps>> = ({
  utilisateurConnecte = {} as IOfficier,
  utilisateurs = [] as IUtilisateur[],
  services = servicesALL.data as any as IService[],
  decrets = [] as IDecret[],
  erreurLogin,
  children
}) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);

  return (
    <RECEContextData.Provider
      value={{
        utilisateurConnecte,
        utilisateurs,
        services,
        decrets,
        isDirty,
        erreurLogin
      }}
    >
      <RECEContextActions.Provider
        value={{
          setIsDirty
        }}
      >
        {children}
      </RECEContextActions.Provider>
    </RECEContextData.Provider>
  );
};

export default MockRECEContextProvider;
