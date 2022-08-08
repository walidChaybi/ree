import { useEffect, useState } from "react";
import { getCompteurRequetes } from "../../../../../api/appels/requeteApi";
import { logError } from "../../../../common/util/LogManager";

export function useCompteurRequeteHook(
  reloadCompteur: boolean,
  statuts: string[]
) {
  const [nombreRequetesState, setNombreRequetesState] = useState<number>(0);

  useEffect(() => {
    getCompteurRequetes(statuts.join(","))
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
  }, [reloadCompteur, statuts]);

  return {
    nombreRequetesState
  };
}
