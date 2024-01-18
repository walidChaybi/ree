import { composerDocumentFinal } from "@api/appels/etatcivilApi";
import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
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
  erreur?: IErreurTraitementApi;
}

export const useComposerDocumentFinalApiHook = (
  params?: IComposerDocumentFinalApiHookParams
): [IComposerDocumentFinalApiHookResultat | undefined, () => void] => {
  const [resultat, setResultat] =
    useState<IComposerDocumentFinalApiHookResultat>();

  const reinitialiserResultatApi = () => {
    setResultat(undefined);
  };

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
          const erreur: IErreurTraitementApi = {
            code: JSON.parse(errors?.message)?.errors[0]?.code,
            message: JSON.parse(errors?.message)?.errors[0]?.message
          };
          setResultat({
            documentRecomposeASigner: "",
            codeReponse: errors.status,
            erreur
          });
          erreur.code !== CodeErreurFonctionnelle.FCT_PLAGE_HORAIRE_SIGNATURE &&
            logError({
              error: errors,
              messageUtilisateur:
                "Impossible de composer le document final du projet d'acte."
            });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [resultat, reinitialiserResultatApi];
};
