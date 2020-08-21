import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../../api/ApiManager";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { reponseRequeteMapperUnitaire } from "../DonneesRequeteHook";
import { RequestsInformations } from "./RequetePage";
import { ApiEndpoints } from "../../../router/UrlManager";
import { IDataTable } from "../MesRequetesPage";
import { IUtilisateurSSOApi } from "../../../core/LoginHook";
export interface IQueryParametersPourRequete {
  statut?: StatutRequete;
  idRequete: string;
}

export function useRequeteDataApi(
  queryParameters: IQueryParametersPourRequete,
  officier?: IUtilisateurSSOApi,
  requestsInformations?: RequestsInformations
) {
  const [dataState, setDataState] = useState<IDataTable[]>(
    requestsInformations ? requestsInformations.data : []
  );
  const [errorState, setErrorState] = useState(undefined);
  useEffect(() => {
    setErrorState(undefined);
    setDataState([]);
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    if (requestsInformations === undefined) {
      if (officier !== undefined) {
        api
          .fetch({
            method: HttpMethod.GET,
            uri: `${ApiEndpoints.RequetesUrl}/${queryParameters.idRequete}`,
            parameters: {
              nomOec: officier.nom,
              prenomOec: officier.prenom,
              statut: queryParameters.statut,
            },
          })
          .then((result) => {
            const tmp = reponseRequeteMapperUnitaire(result.body.data);
            setDataState([tmp]);
          })
          .catch((error) => {
            setErrorState(error);
          });
      }
    } else {
      setDataState(requestsInformations.data);
    }
  }, [
    queryParameters.idRequete,
    queryParameters.statut,
    requestsInformations,
    officier,
  ]);
  return {
    dataState,
    errorState,
  };
}
