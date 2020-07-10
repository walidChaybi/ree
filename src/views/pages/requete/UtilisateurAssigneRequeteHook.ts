import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { IDataTable } from "./MesRequetesPage";

export interface IQueryParametersAssigneRequetes {
  idRequete: string;
  nomOec: string;
  prenomOec: string;
}

export function useUtilisateurRequeteApi(
  queryParameters?: IQueryParametersAssigneRequetes,
  requetes?: IDataTable[]
) {
  const [dataState, setDataState] = useState<IQueryParametersAssigneRequetes>();
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    if (queryParameters !== undefined) {
      const api = ApiManager.getInstance("rece-requete-api", "v1");
      api
        .fetch({
          method: HttpMethod.POST,
          uri: ApiEndpoints.RequetesUrl,
          data: {
            ...queryParameters,
          },
        })
        .then(() => {
          if (requetes !== undefined) {
            const idxRequete = requetes.findIndex(
              (r) => r.idRequete === queryParameters.idRequete
            );

            requetes[
              idxRequete
            ].nomOec = `${queryParameters.prenomOec} ${queryParameters.nomOec}`;
          }
          setDataState(queryParameters);
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters, requetes]);

  return {
    dataState,
    errorState,
  };
}
