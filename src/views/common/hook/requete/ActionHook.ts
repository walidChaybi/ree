import { postCreationActionEtMiseAjourStatut } from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface CreationActionEtMiseAjourStatutParams {
  libelleAction?: string;
  statutRequete?: StatutRequete;
  requeteId?: string;
}

export function usePostCreationActionEtMiseAjourStatutApi(
  params?: CreationActionEtMiseAjourStatutParams
) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (
      params &&
      params.requeteId &&
      params.libelleAction &&
      params.statutRequete
    ) {
      postCreationActionEtMiseAjourStatut(
        params.requeteId,
        params.libelleAction,
        params.statutRequete
      )
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête ou de créer une action associée"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
}
