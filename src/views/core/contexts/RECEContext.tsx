/* v8 ignore start */
import { CONFIG_GET_UTILISATEUR_LOGIN } from "@api/configurations/agent/utilisateur/GetLoginConfigApi";
import { IOfficier, mappingOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useEffect, useMemo, useState } from "react";
import { useChargerDonneesApplicatives } from "../../../hooks/ChargerDonneesApplicativesHook";
import useFetchApi from "../../../hooks/FetchApiHook";
import useChargerDonneesContexte from "../../../hooks/useChargerDonneesContexte";

export interface IRECEContext {
  utilisateurConnecte: IOfficier;
  utilisateurs: IUtilisateur[];
  services: IService[];
  decrets: IDecret[];
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  erreurLogin: any;
}

const RECEContextData = React.createContext<Omit<IRECEContext, "setIsDirty">>(
  {} as IRECEContext
);
const RECEContextActions = React.createContext<
  Pick<IRECEContext, "setIsDirty">
>({} as IRECEContext);

const RECEContextProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [utilisateurConnecte, setUtilisateurConnecte] = useState<IOfficier>(
    {} as IOfficier
  );
  const [erreurLogin, setErreurLogin] = useState<any>();

  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { utilisateurs, services, decrets } = useChargerDonneesContexte(
    !!utilisateurConnecte
  );

  const { donneesChargees } = useChargerDonneesApplicatives();

  const contextValue = useMemo(
    () => ({
      utilisateurConnecte,
      utilisateurs,
      services,
      decrets,
      isDirty,
      erreurLogin
    }),
    [utilisateurConnecte, utilisateurs, services, decrets, isDirty, erreurLogin]
  );

  const contextActions = useMemo(
    () => ({
      setIsDirty
    }),
    []
  );

  const { appelApi: appelApiLogin } = useFetchApi(CONFIG_GET_UTILISATEUR_LOGIN);

  useEffect(() => {
    appelApiLogin({
      apresSucces: (officierLogin, headers) => {
        const officier = mappingOfficier(headers, officierLogin);
        gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
          headers,
          officier.idSSO
        );
        setUtilisateurConnecte(officier);
      },
      apresErreur: erreurs => {
        setErreurLogin(erreurs);
      }
    });
  }, []);

  return donneesChargees ? (
    <RECEContextData.Provider value={contextValue}>
      <RECEContextActions.Provider value={contextActions}>
        {utilisateurConnecte && children}
      </RECEContextActions.Provider>
    </RECEContextData.Provider>
  ) : (
    <></>
  );
};

export { RECEContextActions, RECEContextData, RECEContextProvider };
/* v8 ignore end */
