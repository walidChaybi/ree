/* v8 ignore start */
import { CONFIG_GET_UTILISATEUR_CONNECTE } from "@api/configurations/agent/utilisateur/GetUtilisateurConnecteConfigApi";
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

export interface IErreurConnexion {
  avecErreur: boolean;
  statut?: number;
}

interface IDonneesContext {
  utilisateurs: IUtilisateur[];
  services: IService[];
  decrets: IDecret[];
}
export interface IRECEContext extends IDonneesContext {
  utilisateurConnecte: IOfficier;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  erreurConnexion: IErreurConnexion | null;
}

const RECEContextData = React.createContext<Omit<IRECEContext, "setIsDirty">>({} as IRECEContext);
const RECEContextActions = React.createContext<Pick<IRECEContext, "setIsDirty">>({} as IRECEContext);

const RECEContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [utilisateurConnecte, setUtilisateurConnecte] = useState<IOfficier | null>(null);
  const [erreurConnexion, setErreurConnexion] = useState<IErreurConnexion | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [donneesContext, setDonneesContext] = useState<IDonneesContext>({
    utilisateurs: [],
    services: [],
    decrets: []
  });
  const [nomenclaturesChargees, setNomenclaturesChargees] = useState<boolean>(false);
  const { appelApi: appelApiLogin } = useFetchApi(CONFIG_GET_UTILISATEUR_CONNECTE);
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
      apresErreur: (erreurs, statut) => {
        gestionnaireDoubleOuverture.init();
        setUtilisateurConnecte({} as IOfficier);
        setNomenclaturesChargees(true);
        setErreurConnexion({
          avecErreur: Boolean(erreurs.length),
          statut: statut
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      utilisateurConnecte: utilisateurConnecte ?? ({} as IOfficier),
      isDirty,
      erreurConnexion,
      ...donneesContext
    }),
    [utilisateurConnecte, donneesContext, isDirty, erreurConnexion]
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
