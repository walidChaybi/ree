import { TAppelTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

type TEtatTraitement = "EN_ATTENTE_APPEL" | "EN_COURS" | "TERMINE";

type TActionsTraitement<TReponseSucces> = {
  apresSucces?: (reponse: TReponseSucces) => void;
  apresErreur?: (messageErreur?: string) => void;
  finalement?: () => void;
};

const useTraitementApi = <TParam extends object | undefined, TReponseSucces>(traitement: TTraitementApi<TParam, TReponseSucces>) => {
  const [etatTraitement, setEtatTraitement] = useState<TEtatTraitement>("EN_ATTENTE_APPEL");
  const [actionsTraitement, setActionsTraitement] = useState<TActionsTraitement<TReponseSucces> | null>(null);
  const { lancer, erreurTraitement, reponseTraitement } = traitement.Lancer(() => setEtatTraitement("TERMINE"));

  const lancerTraitement = (appel?: TAppelTraitement<TParam, TReponseSucces>): void => {
    if (etatTraitement === "EN_COURS") {
      return;
    }

    setActionsTraitement({
      apresSucces: appel?.apresSucces,
      apresErreur: appel?.apresErreur,
      finalement: appel?.finalement,
    });
    setEtatTraitement("EN_COURS");
    lancer(appel?.parametres);
  };

  useEffect(() => {
    if (etatTraitement !== "TERMINE") {
      return;
    }

    erreurTraitement.enEchec
      ? actionsTraitement?.apresErreur?.(erreurTraitement.message)
      : actionsTraitement?.apresSucces?.(reponseTraitement);
    actionsTraitement?.finalement?.();
    erreurTraitement.message && logError({ messageUtilisateur: erreurTraitement.message });
    setEtatTraitement("EN_ATTENTE_APPEL");
    setActionsTraitement(null);
  }, [etatTraitement]);

  return {
    lancerTraitement: lancerTraitement,
    traitementEnCours: etatTraitement === "EN_COURS",
  };
};

export default useTraitementApi;
