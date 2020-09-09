import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { IDataTable } from "./MesRequetesPage";
import { getText } from "../../common/widget/Text";

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
  const [sucessState, setSuccessState] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (queryParameters !== undefined) {
      const api = ApiManager.getInstance("rece-requete-api", "v1");

      setSuccessState(undefined);

      api
        .fetch({
          method: HttpMethod.PATCH,
          uri: ApiEndpoints.RequetesUrl,
          data: [{ ...queryParameters }],
          headers: []
        })
        .then(() => {
          if (requetes !== undefined) {
            const idxRequete = requetes.findIndex(
              r => r.idRequete === queryParameters.idRequete
            );

            requetes[
              idxRequete
            ].nomOec = `${queryParameters.prenomOec} ${queryParameters.nomOec}`;

            setSuccessState(
              `${getText("success.pages.requetes.assigneDebut")}${
                requetes[idxRequete].idSagaDila
              } ${getText("success.pages.requetes.assigneFin")}`
            );
          }

          setDataState(queryParameters);
        })
        .catch(error => {
          setErrorState(error);
        });
    }
  }, [queryParameters, requetes]);

  return {
    dataState,
    errorState,
    sucessState
  };
}
