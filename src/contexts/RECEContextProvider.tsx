import { CONFIG_GET_UTILISATEUR_CONNECTE } from "@api/configurations/agent/utilisateur/GetUtilisateurConnecteConfigApi";
import { TRAITEMENT_GET_DONNEES_CONTEXT } from "@api/traitements/RECEContext/TraitementGetDonneesContext";
import { TRAITEMENT_GET_NOMENCLATURES } from "@api/traitements/RECEContext/TraitementGetNomenclatures";
import { IService } from "@model/agent/IService";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import React, { useEffect, useMemo, useState } from "react";
import AppChargeur from "../composants/commun/chargeurs/AppChargeur";
import useFetchApi from "../hooks/api/FetchApiHook";
import useTraitementApi from "../hooks/api/TraitementApiHook";

export interface IErreurConnexion {
  avecErreur: boolean;
  statut?: number;
}

interface IDonneesConnexion {
  utilisateurConnecte: UtilisateurConnecte;
  erreurConnexion: IErreurConnexion | null;
  chargees: boolean;
}

interface IDonneesContext {
  utilisateurs: Utilisateur[];
  services: IService[];
  decrets: IDecret[];
}

interface IRECEContext extends IDonneesContext {
  utilisateurConnecte: UtilisateurConnecte;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  erreurConnexion: IErreurConnexion | null;
}

const valeursInitialesDonneesConnexion = {
  utilisateurConnecte: UtilisateurConnecte.inconnu(),
  erreurConnexion: null,
  chargees: false
};

const valeursInitialesDonneesContext = {
  utilisateurs: [],
  services: [],
  decrets: []
};

const RECEContextData = React.createContext<Omit<IRECEContext, "setIsDirty">>({} as IRECEContext);
const RECEContextActions = React.createContext<Pick<IRECEContext, "setIsDirty">>({} as IRECEContext);

const RECEContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [donneesConnexion, setDonneesConnexion] = useState<IDonneesConnexion>(valeursInitialesDonneesConnexion);
  const [donneesContext, setDonneesContext] = useState<IDonneesContext>(valeursInitialesDonneesContext);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { appelApi: appelApiLogin } = useFetchApi(CONFIG_GET_UTILISATEUR_CONNECTE);
  const { lancerTraitement: chargerNomenclature } = useTraitementApi(TRAITEMENT_GET_NOMENCLATURES);
  const { lancerTraitement: recupererDonneesContext } = useTraitementApi(TRAITEMENT_GET_DONNEES_CONTEXT);

  useEffect(() => {
    appelApiLogin({
      apresSucces: (officierLogin, headers) => {
        const utilisateur = UtilisateurConnecte.depuisDto(officierLogin);

        if (!utilisateur) {
          setDonneesConnexion(prec => ({ ...prec, erreurConnexion: { avecErreur: true }, chargees: true }));

          return;
        }

        gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(headers, utilisateur.idArobas);
        GestionnaireARetraiterDansSaga.init();

        chargerNomenclature({
          apresSucces: () => setDonneesConnexion(prec => ({ ...prec, utilisateurConnecte: utilisateur, chargees: true }))
        });

        recupererDonneesContext({ apresSucces: donneesContext => setDonneesContext(donneesContext) });
      },
      apresErreur: (erreurs, statut) =>
        setDonneesConnexion(prec => ({
          ...prec,
          erreurConnexion: {
            avecErreur: Boolean(erreurs.length),
            statut: statut
          },
          chargees: true
        }))
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      utilisateurConnecte: donneesConnexion.utilisateurConnecte,
      isDirty,
      erreurConnexion: donneesConnexion.erreurConnexion,
      ...donneesContext
    }),
    [donneesConnexion, donneesContext, isDirty]
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
        {donneesConnexion.chargees ? children : <AppChargeur />}
      </RECEContextActions.Provider>
    </RECEContextData.Provider>
  );
};

export { RECEContextActions, RECEContextData, RECEContextProvider };
