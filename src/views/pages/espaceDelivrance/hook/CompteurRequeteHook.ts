import { useState, useEffect } from "react";
import { getCompteurRequetes } from "../../../../api/appels/requeteApi";
import { logError } from "../../../common/util/LogManager";

export function useCompteurRequeteHook(reloadCompteur = false) {
  const [nombreRequetesState, setNombreRequetesState] = useState<number>(0);

  useEffect(() => {
    getCompteurRequetes()
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
