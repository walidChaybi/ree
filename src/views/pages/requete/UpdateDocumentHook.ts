import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { useState, useEffect } from "react";

export interface IQueryParameterUpdateDocument {
  contenu: string;
  nom: string;
  conteneurSwift: string;
}

export interface IUpdateDocumentApiResult {
  url: string;
}

export function useUpdateDocumentApi(
  queryParameters?: IQueryParameterUpdateDocument
) {
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    if (queryParameters) {
      api
        .fetch({
          method: HttpMethod.PATCH,
          uri: ApiEndpoints.DocumentsdelivresUrl,
          data: [{ ...queryParameters }],
          headers: [],
        })
        .then((result) => {
          // doNothing
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters]);

  return {
    errorState,
  };
}
