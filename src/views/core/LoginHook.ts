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
  useEffect(() => {
    const api = ApiManager.getInstance("rece/rece-securite-api", "v1");
    api
      .fetch({
        method: HttpMethod.GET,
        uri: ApiEndpoints.SecuriteUrl
      })
      .then(result => {
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

function setUtilisateurSSOApi(httpHeaders: any) {
  return {
    idSSO: httpHeaders.idSSO,
    nom: httpHeaders.nom,
    prenom: httpHeaders.prenom,
    trigramme: httpHeaders.trigramme,
    mail: httpHeaders.mail,
    telephone: httpHeaders.telephone,
    section: httpHeaders.section,
    bureau: httpHeaders.bureau,
    departement: httpHeaders.departement,
    service: httpHeaders.service
  };
}
