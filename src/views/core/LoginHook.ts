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
  const [dataState, setDataState] = useState<IUtilisateurSSOApi>({
    idSSO: "",
    nom: "",
    prenom: "",
    trigramme: "",
    mail: "",
    telephone: "",
    section: "",
    bureau: "",
    departement: "",
    service: "",
  });
  const [errorState, setErrorState] = useState(undefined);
  useEffect(() => {
    const api = ApiManager.getInstance("rece-securite-api", "v1");
    api
      .fetch({
        method: HttpMethod.GET,
        uri: ApiEndpoints.SecuriteUrl,
      })
      .then((result) => {
        setDataState(setUtilisateurSSOApi(result.headers));
      })
      .catch((error) => {
        setErrorState(error);
      });
  }, []);

  return {
    dataState,
    errorState,
  };
}

function setUtilisateurSSOApi(headers: any) {
  return {
    idSSO: headers.idSSO,
    nom: headers.nom,
    prenom: headers.prenom,
    trigramme: headers.trigramme,
    mail: headers.mail,
    telephone: headers.telephone,
    section: headers.section,
    bureau: headers.bureau,
    departement: headers.departement,
    service: headers.service,
  };
}
