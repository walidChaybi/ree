import { ApiManager, HttpMethod } from "../../api/ApiManager";
import { ApiEndpoints } from "../router/UrlManager";
import { useState, useEffect } from "react";
import {
  OfficierInLocalStorage,
  getDefaultOfficier,
} from "./contexts/OfficierContext";

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
  const [dataState, setDataState] = useState<IUtilisateurSSOApi>(
    getDefaultOfficier()
  );
  const [errorState, setErrorState] = useState(undefined);
  useEffect(() => {
    const api = ApiManager.getInstance("rece-securite-api", "v1");
    api
      .fetch({
        method: HttpMethod.GET,
        uri: ApiEndpoints.SecuriteUrl,
      })
      .then((result) => {
        const officier = getUtilisateurSSOApiFromHeaders(result.headers);
        setDataState(officier);
        setUtilisateurSSOApiInLocalStorage(officier);
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

function getUtilisateurSSOApiFromHeaders(headers: any): IUtilisateurSSOApi {
  return {
    idSSO: headers.id_sso,
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

function setUtilisateurSSOApiInLocalStorage(headers: any) {
  localStorage.setItem(OfficierInLocalStorage, JSON.stringify(headers));
}
