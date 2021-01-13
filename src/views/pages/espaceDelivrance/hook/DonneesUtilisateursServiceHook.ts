import { useState, useEffect } from "react";
import { getUtilisateurs } from "../../../../api/appels/agentApi";

export interface IUtilisateurApi {
  idUtilisateur: string;
  nom: string;
  prenom: string;
}

export function useUtilisateurApi() {
  const [dataState, setDataState] = useState<IUtilisateurApi[]>([]);
  const [errorState, setErrorState] = useState(undefined);
  useEffect(() => {
    setDataState([]);
    setErrorState(undefined);
    getUtilisateurs()
      .then(result => {
        setDataState(result.body.data);
      })
      .catch(error => {
        setErrorState(error);
      });
  }, []);

  return {
    dataState,
    errorState
  };
}
