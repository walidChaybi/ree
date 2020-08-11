import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { useState, useEffect } from "react";
import { StatutRequete } from "../../../model/requete/StatutRequete";

export interface IQueryParameterUpdateStatutRequete {
  statut: StatutRequete;
}

export function useUpdateStatutRequeteApi(
  queryParameters: IQueryParameterUpdateStatutRequete,
  callback: () => void
) {
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    if (queryParameters) {
      api
        .fetch({
          method: HttpMethod.PATCH,
          uri: ApiEndpoints.RequetesUrl,
          data: [{ ...queryParameters }],
          headers: []
        })
        .then(result => {
          console.log(result);
          callback();
        })
        .catch(error => {
          setErrorState(error);
        });
    }
  }, [queryParameters, callback]);

  return {
    errorState
  };
}
