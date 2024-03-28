import { integrerDocumentMentionSigne } from "@api/appels/etatcivilApi";
import { TModeAuthentification } from "@model/agent/types";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IIntegrerDocumentMentionsUlterieuresParams {
  idActe: string;
  document: string;
  infosCarteSignature: IInfosCarteSignature;
  modeAuthentification: TModeAuthentification;
}

interface IIntegrerDocumentMentionsUlterieuresApiHookResultat {
  codeReponseResultat?: number;
  reinitialiserParamsApiHook: () => void;
}

export const useIntegrerDocumentMentionsUlterieuresApiHook = (
  params?: IIntegrerDocumentMentionsUlterieuresParams
): IIntegrerDocumentMentionsUlterieuresApiHookResultat => {
  const [codeReponse, setCodeReponse] = useState<number>();

  const reinitialiserCodeReponse = () => {
    setCodeReponse(undefined);
  };

  useEffect(() => {
    if (params) {
      integrerDocumentMentionSigne(
        params.idActe,
        params.document,
        params.infosCarteSignature,
        params.modeAuthentification
      )
        .then(reponse => setCodeReponse(reponse.status))
        .catch((error: any) => {
          setCodeReponse(error.status); // TODO: Revoir la gestion du status code.
          logError({
            error,
            messageUtilisateur:
              "Impossible d'enregistrer le document final signé."
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
