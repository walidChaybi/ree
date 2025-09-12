import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { IService } from "@model/agent/IService";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import React, { useMemo, useState } from "react";
import { IErreurConnexion, RECEContextActions, RECEContextData } from "../../../contexts/RECEContextProvider";
import { servicesALL } from "../data/servicesALL";

interface IMockRECEContextProviderProps {
  utilisateurConnecte?: UtilisateurConnecte;
  utilisateurs?: Utilisateur[];
  services?: IService[];
  decrets?: IDecret[];
  erreurConnexion?: IErreurConnexion | null;
}

const MockRECEContextProvider: React.FC<React.PropsWithChildren<IMockRECEContextProviderProps>> = ({
  utilisateurConnecte = UtilisateurConnecte.inconnu(),
  utilisateurs = LISTE_UTILISATEURS,
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
