import { composerDocumentFinal } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IComposerDocumentFinalApiHookParams {
  idActe?: string;
  issuerCertificat?: string;
  nomDansCertificat?: string;
}

export interface IComposerDocumentFinalApiHookResultat {
  documentRecomposeASigner: string;
}

export const useComposerDocumentFinalApiHook = (
  params?: IComposerDocumentFinalApiHookParams
): IComposerDocumentFinalApiHookResultat | undefined => {
  const [resultat, setResultat] =
    useState<IComposerDocumentFinalApiHookResultat>();

  useEffect(() => {
    console.log("useComposerDocumentFinalApiHook", params);
    if (
      params?.idActe &&
      params?.issuerCertificat &&
      params?.nomDansCertificat
    ) {
      composerDocumentFinal(
        params.idActe,
        params.issuerCertificat,
        params.nomDansCertificat
      )
        .then(reponse => {
          setResultat({ documentRecomposeASigner: reponse.body.data });
        })
        .catch((erreur: any) => {
          logError({
            error: erreur,
            messageUtilisateur: "Impossible de signer le projet d'acte."
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
};
