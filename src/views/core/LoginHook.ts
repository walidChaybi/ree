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
  const [dataState, setDataState] = useState<IUtilisateurSSOApi>();
  const [errorState, setErrorState] = useState(undefined);
  // console.log("LoginAPI");
  useEffect(() => {
    const api = ApiManager.getInstance("rece/rece-securite-api", "v1");
    api
      .fetch({
        method: HttpMethod.GET,
        uri: ApiEndpoints.SecuriteUrl
      })
      .then(result => {
        // console.log(result.body.httpHeaders);
        setDataState(setUtilisateurSSOApi(result.body.httpHeaders));
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

function setUtilisateurSSOApi(result: any) {
  return {
    idSSO: result.body.httpHeaders.idSSO,
    nom: result.body.httpHeaders.nom,
    prenom: result.body.httpHeaders.prenom,
    trigramme: result.body.httpHeaders.trigramme,
    mail: result.body.httpHeaders.mail,
    telephone: result.body.httpHeaders.telephone,
    section: result.body.httpHeaders.section,
    bureau: result.body.httpHeaders.bureau,
    departement: result.body.httpHeaders.departement,
    service: result.body.httpHeaders.service
  };
}
