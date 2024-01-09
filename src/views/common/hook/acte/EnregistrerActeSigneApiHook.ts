import { HTTP_BAD_REQUEST } from "@api/ApiManager";
import { enregistrerActeSigne } from "@api/appels/etatcivilApi";
import { TModeAuthentification } from "@model/agent/types";
import { logError } from "@util/LogManager";
import { IInfosCarteSignature } from "@widget/signature/types";
import { useEffect, useState } from "react";

export interface IEnregistrerActeSigneApiHookParams {
  idActe: string;
  document: string;
  infosCarteSignature: IInfosCarteSignature;
  modeAuthentification: TModeAuthentification;
}

export const useEnregistrerActeSigneApiHook = (
  params?: IEnregistrerActeSigneApiHookParams
): number | undefined => {
  const [codeReponse, setCodeReponse] = useState<number>();

  useEffect(() => {
    if (params) {
      enregistrerActeSigne(
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

  return codeReponse;
};
