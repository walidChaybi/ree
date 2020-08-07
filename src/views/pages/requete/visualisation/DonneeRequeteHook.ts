import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../../api/ApiManager";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { reponseRequeteMapperUnitaire } from "../DonneesRequeteHook";
import { RequestsInformations } from "./RequetePage";
import { ApiEndpoints } from "../../../router/UrlManager";
import { IDataTable } from "../MesRequetesPage";
export interface IQueryParametersPourRequete {
  nomOec: string;
  prenomOec: string;
  statut?: StatutRequete;
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
    setErrorState(undefined);
    setDataState([]);
    const api = ApiManager.getInstance("rece/rece-requete-api", "v1");
    if (requestsInformations === undefined) {
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
          const tmp = reponseRequeteMapperUnitaire(result.body.data);
          setDataState([tmp]);
        })
        .catch(error => {
          setErrorState(error);
        });
    } else {
      setDataState(requestsInformations.data);
    }
  }, [
    queryParameters.nomOec,
    queryParameters.prenomOec,
    queryParameters.idRequete,
    queryParameters.statut,
    requestsInformations
  ]);
  return {
    dataState,
    errorState
  };
}
