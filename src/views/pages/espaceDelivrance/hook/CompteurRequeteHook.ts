import { useState, useEffect } from "react";
import { getCompteurRequetes } from "../../../../api/appels/requeteApi";

export function useCompteurRequeteHook(reloadCompteur?: boolean) {
  const [nombreRequetesState, setNombreRequetesState] = useState<number>(0);
  const [errorState, setErrorState] = useState<any>();

  useEffect(() => {
    getCompteurRequetes()
      .then(result => {
        setNombreRequetesState(result.body.data);
      })
      .catch(error => {
        setErrorState(error);
      });
  }, [reloadCompteur]);

  return {
    nombreRequetesState,
    errorState
  };
}
