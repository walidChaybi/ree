import { useEffect, useState } from "react";
import { getUtilisateursById } from "../../../../api/appels/agentApi";
import { logError } from "../../../common/util/LogManager";

export interface IUtilisateurInfoApi {
  idUtilisateur: string;
  nom: string;
  prenom: string;
  trigramme: string;
}

export function useUtilisateursInfosApi(ids: string[]) {
  const [dataState, setDataState] = useState<IUtilisateurInfoApi[]>();

  useEffect(() => {
    if (ids != null && ids.length > 0) {
      getUtilisateursById(ids)
        .then(result => {
          setDataState(result.body.data);
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les données des utilisateurs",
            error
          });
        });
    }
  }, [ids]);

  return {
    dataState
  };
}
