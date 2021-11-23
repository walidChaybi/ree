import { useEffect, useState } from "react";
import { sauvegarderReponseReqInfo } from "../../../../../../api/appels/requeteApi";
import { logError } from "../../../../../common/util/LogManager";

export interface ISauvegarderReponseReqInfoParams {
  idRequete: string;
  corpsMail: string;
  idReponse?: string;
}

export function useSauvegarderReponsesReqInfoHook(
  params: ISauvegarderReponseReqInfoParams | undefined
) {
  const [idReponseChoisie, setIdReponseChoisie] =
    useState<string | undefined>();

  useEffect(() => {
    if (params) {
      sauvegarderReponseReqInfo(
        params.idRequete,
        params.corpsMail,
        params.idReponse
      )
        .then(result => {
          setIdReponseChoisie(result.body.data);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de sauvegarder la réponse choisie",
            error
          });
        });
    }
  }, [params]);
  return idReponseChoisie;
}
