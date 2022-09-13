import { updateDateDerniereDelivranceActe } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IDerniereDelivranceActeParams {
  idActe: string;
}

export interface IDerniereDelivranceActeResultat {
  resultat: boolean;
}

export function useDerniereDelivranceActeApiHook(
  params?: IDerniereDelivranceActeParams
) {
  const [resultat, setResultat] = useState<IDerniereDelivranceActeResultat>();

  useEffect(() => {
    if (params && params.idActe) {
      updateDateDerniereDelivranceActe(params.idActe)
        .then(result => {
          setResultat({ resultat: true });
        })
        .catch(error => {
          /* istanbul ignore next */
          setResultat({ resultat: false });
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour la date de dernière délivrance de cet acte",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
