import { postCreationAction } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ICreationActionParams {
  libelleAction?: string;
  requeteId?: string;
}

export const usePostCreationActionApi = (params?: ICreationActionParams) => {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params?.libelleAction && params?.requeteId) {
      postCreationAction(params.requeteId, params.libelleAction)
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de créer l'action pour la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);
  return idAction;
};
