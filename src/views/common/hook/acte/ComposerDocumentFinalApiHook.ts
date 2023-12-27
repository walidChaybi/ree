import { HTTP_BAD_REQUEST } from "@api/ApiManager";
import { composerDocumentFinal } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IComposerDocumentFinalApiHookParams {
  idActe?: string;
  issuerCertificat?: string;
  entiteCertificat?: string;
}

export interface IComposerDocumentFinalApiHookResultat {
  documentRecomposeASigner: string;
  codeReponse: number;
}

export const useComposerDocumentFinalApiHook = (
  params?: IComposerDocumentFinalApiHookParams
): IComposerDocumentFinalApiHookResultat | undefined => {
  const [resultat, setResultat] =
    useState<IComposerDocumentFinalApiHookResultat>();

  useEffect(() => {
    if (
      params?.idActe &&
      params?.issuerCertificat &&
      params?.entiteCertificat
    ) {
      composerDocumentFinal(
        params.idActe,
        params.issuerCertificat,
        params.entiteCertificat
      )
        .then(reponse => {
          setResultat({
            documentRecomposeASigner: reponse.body.data,
            codeReponse: reponse.status
          });
        })
        .catch((errors: any) => {
          setResultat({
            documentRecomposeASigner: "",
            codeReponse: HTTP_BAD_REQUEST // TODO: Revoir la gestion du status code.
          });
          logError({
            error: errors,
            messageUtilisateur:
              "Impossible de composer le document final du projet d'acte."
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
};
