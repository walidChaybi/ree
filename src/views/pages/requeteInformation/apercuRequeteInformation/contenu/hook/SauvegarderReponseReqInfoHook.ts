import { sauvegarderReponseReqInfo } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../utils/AfficherMessage";

export interface ISauvegarderReponseReqInfoParams {
  idRequete: string;
  corpsMail: string;
  idReponse?: string;
}

export function useSauvegarderReponsesReqInfoHook(params: ISauvegarderReponseReqInfoParams | undefined) {
  const [idReponseChoisie, setIdReponseChoisie] = useState<string | undefined>();

  useEffect(() => {
    if (params) {
      sauvegarderReponseReqInfo(params.idRequete, params.corpsMail, params.idReponse)
        .then(result => {
          setIdReponseChoisie(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de sauvegarder la réponse choisie", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [params]);
  return idReponseChoisie;
}
