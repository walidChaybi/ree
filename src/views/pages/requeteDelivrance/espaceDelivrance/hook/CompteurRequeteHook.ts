import { getCompteurRequetes } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useMemo, useState } from "react";

export function useCompteurRequeteHook(
  reloadCompteur: boolean,
  statuts: string[]
) {
  const listeStatus = useMemo(() => statuts.join(""), [statuts]);
  const [nombreRequetesState, setNombreRequetesState] = useState<number>(0);

  useEffect(() => {
    getCompteurRequetes(listeStatus)
      .then(result => {
        setNombreRequetesState(result?.body.data || 0);
      })
      .catch(error => {
        logError({
          messageUtilisateur:
            "Impossible de récupérer le nombre de requête à signer",
          error
        });
      });
  }, [reloadCompteur, listeStatus]);

  return {
    nombreRequetesState
  };
}
