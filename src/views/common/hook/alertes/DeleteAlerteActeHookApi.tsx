import { deleteAlerteActe } from "@api/appels/etatcivilApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface DeleteAlerteActeApiHookParameters {
  idAlerteActe: string;
  idActe: string;
}

interface DeleteAlerteActeApiHookResultat {
  status: boolean;
}

export const useDeleteAlerteActeApiHook = (parameters?: DeleteAlerteActeApiHookParameters) => {
  const [resultat, setResultat] = useState<DeleteAlerteActeApiHookResultat>();
  useEffect(() => {
    if (parameters) {
      deleteAlerteActe(parameters)
        .then((result: any) => {
          setResultat({
            status: result?.status
          });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Une erreur est survenue lors de la suppression de l'alerte'", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [parameters]);
  return resultat;
};
