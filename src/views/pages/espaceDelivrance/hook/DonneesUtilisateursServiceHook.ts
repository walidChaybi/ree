import { useState, useEffect } from "react";
import { IQueryParametersUtilisateursService } from "../../../../api/appels/agentApi";
import { getUtilisateurs } from "../../../../api/appels/agentApi";

export interface IUtilisateurApi {
  idUtilisateur: string;
  nom: string;
  prenom: string;
}

export function useUtilisateurApi(
  queryParameters: IQueryParametersUtilisateursService
) {
  const [dataState, setDataState] = useState<IUtilisateurApi[]>([]);
  const [errorState, setErrorState] = useState(undefined);
  useEffect(() => {
    setDataState([]);
    setErrorState(undefined);
    if (queryParameters.idArobas !== undefined) {
      getUtilisateurs(queryParameters.idArobas)
        .then(result => {
          setDataState(result.body.data);
        })
        .catch(error => {
          setErrorState(error);
        });
    }
  }, [queryParameters.idArobas]);

  return {
    dataState,
    errorState
  };
}
