import { postCreationAction } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

interface ICreationActionParams {
  libelleAction?: string;
  requeteId?: string;
}

export function usePostCreationActionApi(params?: ICreationActionParams) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params?.libelleAction && params?.requeteId) {
      postCreationAction(params.requeteId, params.libelleAction)
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible de créer l'action pour la requête"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
}
