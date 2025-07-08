import { postCreationActionEtMiseAjourStatut } from "@api/appels/requeteApi";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface ICreationActionEtMiseAjourStatutParams {
  libelleAction?: string;
  statutRequete?: keyof typeof EStatutRequete;
  requeteId?: string;
}

export interface ICreationActionParams {
  libelleAction?: string;
  requeteId?: string;
}

export function usePostCreationActionEtMiseAjourStatutApi(params?: ICreationActionEtMiseAjourStatutParams) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params?.requeteId && params.libelleAction && params.statutRequete) {
      postCreationActionEtMiseAjourStatut(params.requeteId, params.libelleAction, params.statutRequete)
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible de mettre à jour le statut de la requête ou de créer une action associée"
          });
        });
    }
  }, [params]);
  return idAction;
}
