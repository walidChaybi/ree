import { useState, useEffect } from "react";
import { getLogin } from "../../../api/appels/securiteApi";

export interface ILoginApi {
  officierDataState?: IOfficierSSOApi;
  erreurState?: any;
}
export interface IOfficierSSOApi {
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
  const [officierDataState, setOfficierDataState] = useState<IOfficierSSOApi>();
  const [erreurState, setErreurState] = useState(undefined);

  useEffect(() => {
    getLogin()
      .then((result) => {
        const officier = getUtilisateurSSOApiFromHeaders(result.headers);
        setOfficierDataState(officier);
      })
      .catch((error) => {
        setErreurState(error);
      });
  }, []);

  return {
    officierDataState,
    erreurState
  };
}

function getUtilisateurSSOApiFromHeaders(headers: any): IOfficierSSOApi {
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
    service: headers.service
  };
}
