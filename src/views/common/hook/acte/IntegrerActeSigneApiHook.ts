import { HTTP_BAD_REQUEST } from "@api/ApiManager";
import { integrerActeSigne } from "@api/appels/etatcivilApi";
import { TModeAuthentification } from "@model/agent/types";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IIntegrerActeSigneApiHookParams {
  idActe: string;
  document: string;
  infosCarteSignature: IInfosCarteSignature;
  modeAuthentification: TModeAuthentification;
}

export const useIntegrerActeSigneApiHook = (
  params?: IIntegrerActeSigneApiHookParams
): [number | undefined, () => void] => {
  const [codeReponse, setCodeReponse] = useState<number>();

  const reinitialiserCodeReponse = () => {
    setCodeReponse(undefined);
  };

  useEffect(() => {
    if (params) {
      integrerActeSigne(
        params.idActe,
        params.document,
        params.infosCarteSignature,
        params.modeAuthentification
      )
        .then(reponse => setCodeReponse(reponse.status))
        .catch((errors: any) => {
          setCodeReponse(HTTP_BAD_REQUEST); // TODO: Revoir la gestion du status code.
          logError({
            error: errors,
            messageUtilisateur:
              "Impossible d'enregistrer le document final signé."
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [codeReponse, reinitialiserCodeReponse];
};
