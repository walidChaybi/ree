import { HTTP_BAD_REQUEST } from "@api/ApiManager";
import { enregistrerActeSigne } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { IInfosCarteSignature } from "./../../widget/signature/types";

export interface IEnregistrerActeSigneApiHookParams {
  idActe: string;
  document: string;
  infosCarteSignature: IInfosCarteSignature;
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
        params.infosCarteSignature
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
