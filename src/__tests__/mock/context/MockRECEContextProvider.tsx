import { IErreurConnexion, RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { IOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import React, { useMemo, useState } from "react";
import { servicesALL } from "../data/servicesALL";

interface IMockRECEContextProviderProps {
  utilisateurConnecte?: IOfficier;
  utilisateurs?: IUtilisateur[];
  services?: IService[];
  decrets?: IDecret[];
  erreurConnexion?: IErreurConnexion | null;
}

const MockRECEContextProvider: React.FC<React.PropsWithChildren<IMockRECEContextProviderProps>> = ({
  utilisateurConnecte = {} as IOfficier,
  utilisateurs = [] as IUtilisateur[],
  services = servicesALL.data as any as IService[],
  decrets = [] as IDecret[],
  erreurConnexion = null,
  children
}) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const valeursContext = useMemo(
    () => ({
      utilisateurConnecte,
      utilisateurs,
      services,
      decrets,
      isDirty,
      erreurConnexion
    }),
    [utilisateurConnecte, utilisateurs, services, decrets, isDirty, erreurConnexion]
  );

  const actionsContext = useMemo(() => ({ setIsDirty }), [setIsDirty]);

  return (
    <RECEContextData.Provider value={valeursContext}>
      <RECEContextActions.Provider value={actionsContext}>{children}</RECEContextActions.Provider>
    </RECEContextData.Provider>
  );
};

export default MockRECEContextProvider;
