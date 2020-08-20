import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";

export interface IUtilisateurApi {
  idUtilisateur: string;
  nom: string;
  prenom: string;
}

export interface IQueryParametersUtilisateursService {
  idArobas?: string;
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
      const api = ApiManager.getInstance("rece-securite-api", "v1");
      api
        .fetch({
          method: HttpMethod.GET,
          uri: ApiEndpoints.UtilisateursUrl,
          parameters: {
            idArobas: queryParameters.idArobas,
          },
        })
        .then((result) => {
          setDataState(result.body.data);
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters.idArobas]);

  return {
    dataState,
    errorState,
  };
}
