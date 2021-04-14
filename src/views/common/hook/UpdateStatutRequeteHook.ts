import { useEffect } from "react";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { patchStatutRequete } from "../../../api/appels/requeteApi";
import { logError } from "../util/LogManager";

export interface IQueryParameterUpdateStatutRequete {
  statut: StatutRequete;
  idRequete: string;
}

export function useUpdateStatutRequeteApi(
  queryParameters?: IQueryParameterUpdateStatutRequete,
  callback?: () => void
) {
  useEffect(() => {
    if (queryParameters) {
      patchStatutRequete(queryParameters)
        .then(result => {
          if (callback !== undefined) {
            callback();
          }
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête",
            error
          });
        });
    }
  }, [queryParameters, callback]);

  return {};
}
