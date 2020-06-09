import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../../api/ApiManager";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { IDataTable } from "../RequeteTableauHeaderCell";
import { reponseRequeteMapperUnitaire } from "../DonneesRequeteHook";
import { RequestsInformations } from "./RequetePage";
import { ApiEndpoints } from "../../../router/UrlManager";
export interface IQueryParametersPourRequete {
  nomOec: string;
  prenomOec: string;
  statut: StatutRequete;
  idRequete: string;
}

export function useRequeteDataApi(
  queryParameters: IQueryParametersPourRequete,
  requestsInformations?: RequestsInformations
) {
  const [dataState, setDataState] = useState<IDataTable[]>(
    requestsInformations ? requestsInformations.data : []
  );
  const [errorState, setErrorState] = useState(undefined);
  useEffect(() => {
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    if (requestsInformations == null) {
      api
        .fetch({
          method: HttpMethod.GET,
          uri: `${ApiEndpoints.RequetesUrl}/${queryParameters.idRequete}`,
          parameters: {
            nomOec: queryParameters.nomOec,
            prenomOec: queryParameters.prenomOec,
            statut: queryParameters.statut
          }
        })
        .then(result => {
          setDataState([reponseRequeteMapperUnitaire(result.body.data)]);
          setErrorState(undefined);
        })
        .catch(error => {
          setErrorState(error);
          setDataState([]);
        });
    } else {
      setDataState(requestsInformations.data);
    }
  }, [
    queryParameters.nomOec,
    queryParameters.prenomOec,
    queryParameters.statut,
    queryParameters.idRequete,
    requestsInformations
  ]);
  return {
    dataState,
    errorState
  };
}
