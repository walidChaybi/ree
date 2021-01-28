import { useState, useEffect } from "react";
import { getUtilisateurs } from "../../../../api/appels/agentApi";
import { logError } from "../../../common/util/LogManager";

export interface IUtilisateurApi {
  idUtilisateur: string;
  nom: string;
  prenom: string;
}

export function useUtilisateurApi() {
  const [dataState, setDataState] = useState<IUtilisateurApi[]>([]);
  useEffect(() => {
    setDataState([]);
    getUtilisateurs()
      .then(result => {
        setDataState(result.body.data);
      })
      .catch(error => {
        logError({
          messageUtilisateur:
            "Impossible de récupérer la liste des utilistaeurs",
          error
        });
      });
  }, []);

  return {
    dataState
  };
}
