/* v8 ignore start */
import { CONFIG_GET_UTILISATEUR_LOGIN } from "@api/configurations/agent/utilisateur/GetLoginConfigApi";
import { TRAITEMENT_GET_DONNEES_CONTEXT } from "@api/traitements/RECEContext/TraitementGetDonneesContext";
import { TRAITEMENT_GET_NOMENCLATURES } from "@api/traitements/RECEContext/TraitementGetNomenclatures";
import { IOfficier, mappingOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import React, { useEffect, useMemo, useState } from "react";
import AppChargeur from "../../../composants/commun/chargeurs/AppChargeur";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import useTraitementApi from "../../../hooks/api/TraitementApiHook";

interface IDonneesContext {
  utilisateurs: IUtilisateur[];
  services: IService[];
  decrets: IDecret[];
}
export interface IRECEContext extends IDonneesContext {
  utilisateurConnecte: IOfficier;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  erreurLogin: any;
}

const RECEContextData = React.createContext<Omit<IRECEContext, "setIsDirty">>({} as IRECEContext);
const RECEContextActions = React.createContext<Pick<IRECEContext, "setIsDirty">>({} as IRECEContext);

const RECEContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [utilisateurConnecte, setUtilisateurConnecte] = useState<IOfficier | null>(null);
  const [erreurLogin, setErreurLogin] = useState<any>();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [donneesContext, setDonneesContext] = useState<IDonneesContext>({
    utilisateurs: [],
    services: [],
    decrets: []
  });
  const [nomenclaturesChargees, setNomenclaturesChargees] = useState<boolean>(false);
  const { appelApi: appelApiLogin } = useFetchApi(CONFIG_GET_UTILISATEUR_LOGIN);
  const { lancerTraitement: chargerNomenclature } = useTraitementApi(TRAITEMENT_GET_NOMENCLATURES);
  const { lancerTraitement: recupererDonneesContext } = useTraitementApi(TRAITEMENT_GET_DONNEES_CONTEXT);

  useEffect(() => {
    appelApiLogin({
      apresSucces: (officierLogin, headers) => {
        const officier = mappingOfficier(headers, officierLogin);

        gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(headers, officier.idSSO);
        GestionnaireARetraiterDansSaga.init();
        gestionnaireDoubleOuverture.init();

        setUtilisateurConnecte(officier);
        chargerNomenclature({ apresSucces: () => setNomenclaturesChargees(true) });
        recupererDonneesContext({ apresSucces: donneesContext => setDonneesContext(donneesContext) });
      },
      apresErreur: erreurs => {
        gestionnaireDoubleOuverture.init();
        setUtilisateurConnecte({} as IOfficier);
        setNomenclaturesChargees(true);
        setErreurLogin(erreurs);
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      utilisateurConnecte: utilisateurConnecte ?? ({} as IOfficier),
      isDirty,
      erreurLogin,
      ...donneesContext
    }),
    [utilisateurConnecte, donneesContext, isDirty, erreurLogin]
  );

  const contextActions = useMemo(
    () => ({
      setIsDirty
    }),
    []
  );

  return (
    <RECEContextData.Provider value={contextValue}>
      <RECEContextActions.Provider value={contextActions}>
        {utilisateurConnecte && nomenclaturesChargees ? children : <AppChargeur />}
      </RECEContextActions.Provider>
    </RECEContextData.Provider>
  );
};

export { RECEContextActions, RECEContextData, RECEContextProvider };
/* v8 ignore end */
