import { useEffect, useState } from "react";
import { getCompteurRequetesV2 } from "../../../../../api/appels/requeteApi";
import { logError } from "../../../../common/util/LogManager";

export function useCompteurRequeteHook(reloadCompteur: boolean) {
  const [nombreRequetesState, setNombreRequetesState] = useState<number>(0);

  useEffect(() => {
    getCompteurRequetesV2()
      .then(result => {
        setNombreRequetesState(result.body.data);
      })
      .catch(error => {
        logError({
          messageUtilisateur:
            "Impossible de récupérer le nombre de requête à signer",
          error
        });
      });
  }, [reloadCompteur]);

  return {
    nombreRequetesState
  };
}
