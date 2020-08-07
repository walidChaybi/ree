import { ApiManager, HttpMethod } from "../../api/ApiManager";
import { ApiEndpoints } from "../router/UrlManager";
import { useState, useEffect } from "react";

export interface IUtilisateurSSOApi {
  idSSO: string;
  nom: string;
  prenom: string;
  trigramme: string;
  mail: string;
  telephone: string;
  section: string;
  bureau: string;
  departement: string;
  service: string;
}

export function useLoginApi() {
  const [dataState, setDataState] = useState<IUtilisateurSSOApi[]>([]);
  const [errorState, setErrorState] = useState(undefined);
  console.log("LoginAPI");
  useEffect(() => {
    const api = ApiManager.getInstance("rece-securite-api", "v1");
    api
      .fetch({
        method: HttpMethod.POST,
        uri: ApiEndpoints.SecuriteUrl
      })
      .then(result => {
        console.log(result);
        setDataState(result.body.data);
      })
      .catch(error => {
        setErrorState(error);
      });
  }, []);

  return {
    dataState,
    errorState
  };
}
