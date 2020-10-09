import { useState, useEffect } from "react";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { patchStatutRequete } from "../../../api/appels/requeteApi";

export interface IQueryParameterUpdateStatutRequete {
  statut: StatutRequete;
  idRequete: string;
}

export function useUpdateStatutRequeteApi(
  queryParameters?: IQueryParameterUpdateStatutRequete,
  callback?: () => void
) {
  const [errorState, setErrorState] = useState<any>();

  useEffect(() => {
    if (queryParameters) {
      patchStatutRequete(queryParameters)
        .then((result) => {
          if (callback !== undefined) {
            callback();
          }
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters, callback]);

  return {
    errorState
  };
}
