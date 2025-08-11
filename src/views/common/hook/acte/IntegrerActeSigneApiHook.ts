import { HTTP_BAD_REQUEST } from "@api/ApiManager";
import { integrerActeSigne } from "@api/appels/etatcivilApi";
import { TModeAuthentification } from "@model/agent/types";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IIntegrerActeSigneApiHookParams {
  idActe: string;
  document: string;
  infosCarteSignature: IInfosCarteSignature;
  modeAuthentification: TModeAuthentification;
}

interface IIntegrerActeSigneApiHookResultat {
  codeReponseResultat?: number;
  reinitialiserParamsApiHook: () => void;
}

export const useIntegrerActeSigneApiHook = (params?: IIntegrerActeSigneApiHookParams): IIntegrerActeSigneApiHookResultat => {
  const [codeReponse, setCodeReponse] = useState<number>();

  const reinitialiserCodeReponse = () => {
    setCodeReponse(undefined);
  };

  useEffect(() => {
    if (params) {
      integrerActeSigne(params.idActe, params.document, params.infosCarteSignature, params.modeAuthentification)
        .then(reponse => setCodeReponse(reponse.status))
        .catch((erreurs: any) => {
          setCodeReponse(HTTP_BAD_REQUEST); // TODO: Revoir la gestion du status code.
          AfficherMessage.erreur("Impossible d'enregistrer le document final signé.", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return {
    codeReponseResultat: codeReponse,
    reinitialiserParamsApiHook: reinitialiserCodeReponse
  };
};
