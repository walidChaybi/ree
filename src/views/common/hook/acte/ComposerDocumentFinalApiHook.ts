import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { composerDocumentFinal } from "@api/appels/etatcivilApi";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { IComposerDocumentFinalApiHookResultat } from "../../../../model/signature/IComposerDocumentFinalApiHookResultat";

export interface IComposerDocumentFinalApiHookParams {
  idActe?: string;
  issuerCertificat?: string;
  entiteCertificat?: string;
}

export const useComposerDocumentFinalApiHook = (
  params?: IComposerDocumentFinalApiHookParams
): [IComposerDocumentFinalApiHookResultat | undefined, () => void] => {
  const [resultat, setResultat] = useState<IComposerDocumentFinalApiHookResultat>();

  const reinitialiserResultatApi = () => {
    setResultat(undefined);
  };

  useEffect(() => {
    if (params?.idActe && params?.issuerCertificat && params?.entiteCertificat) {
      composerDocumentFinal(params.idActe, params.issuerCertificat, params.entiteCertificat)
        .then(reponse => {
          setResultat({
            documentRecomposeASigner: reponse.body.data,
            codeReponse: reponse.status
          });
        })
        .catch((errors: any) => {
          const erreurs = errors?.response?.body?.errors;
          const erreur: IErreurTraitementApi = {
            code: erreurs[0]?.code,
            message: erreurs[0]?.message
          };
          setResultat({
            documentRecomposeASigner: "",
            codeReponse: errors.status,
            erreur
          });
          erreur.code !== CodeErreurFonctionnelle.FCT_PLAGE_HORAIRE_SIGNATURE &&
            logError({
              error: errors,
              messageUtilisateur: "Impossible de composer le document final du projet d'acte."
            });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [resultat, reinitialiserResultatApi];
};
