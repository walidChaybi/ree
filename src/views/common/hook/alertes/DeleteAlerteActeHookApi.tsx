import { deleteAlerteActe } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface DeleteAlerteActeApiHookParameters {
  idAlerteActe: string;
  idActe: string;
}

export interface DeleteAlerteActeApiHookResultat {
  status: boolean;
}

export function useDeleteAlerteActeApiHook(
  parameters?: DeleteAlerteActeApiHookParameters
) {
  const [resultat, setResultat] = useState<DeleteAlerteActeApiHookResultat>();
  useEffect(() => {
    if (parameters) {
      deleteAlerteActe(parameters)
        .then((result: any) => {
          setResultat({
            status: result?.status
          });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la suppression de l'alerte'",
            error
          });
        });
    }
  }, [parameters]);
  return resultat;
}
