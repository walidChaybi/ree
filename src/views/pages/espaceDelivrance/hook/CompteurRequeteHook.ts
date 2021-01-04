import { useState, useEffect } from "react";
import { getCompteurRequetes } from "../../../../api/appels/requeteApi";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";

export function useCompteurRequeteHook(
  officier: IOfficierSSOApi,
  reloadCompteur?: boolean
) {
  const [nombreRequetesState, setNombreRequetesState] = useState<number>(0);
  const [errorState, setErrorState] = useState<any>();

  useEffect(() => {
    getCompteurRequetes(officier)
      .then(result => {
        setNombreRequetesState(result.body.data);
      })
      .catch(error => {
        setErrorState(error);
      });
  }, [officier, reloadCompteur]);

  return {
    nombreRequetesState,
    errorState
  };
}
