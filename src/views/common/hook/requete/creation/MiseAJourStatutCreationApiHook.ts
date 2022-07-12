import { useEffect } from "react";
import { updateStatutRequeteCreation } from "../../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { logError } from "../../../util/LogManager";

export interface MiseAjourStatutCreationParams {
  statutRequete: StatutRequete;
  idRequete: string;
  callback: () => void;
}

export function useMiseAjourStatutCreation(
  params: MiseAjourStatutCreationParams | undefined
) {
  useEffect(() => {
    if (params) {
      updateStatutRequeteCreation(params.idRequete, params.statutRequete)
        .then(result => {
          params.callback();
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête ou de créer une action associée"
          });
        });
    }
  }, [params]);
}
