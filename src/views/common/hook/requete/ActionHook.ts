import { postCreationActionEtMiseAjourStatut } from "@api/appels/requeteApi";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ICreationActionEtMiseAjourStatutParams {
  libelleAction?: string;
  statutRequete?: keyof typeof EStatutRequete;
  requeteId?: string;
  callback?: () => void;
}

export interface ICreationActionParams {
  libelleAction?: string;
  requeteId?: string;
}

export function usePostCreationActionEtMiseAjourStatutApi(params?: ICreationActionEtMiseAjourStatutParams | null) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params?.requeteId && params.libelleAction && params.statutRequete) {
      postCreationActionEtMiseAjourStatut(params.requeteId, params.libelleAction, params.statutRequete)
        .then(result => {
          setIdAction(result.body.data);
          params.callback?.();
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de mettre à jour le statut de la requête ou de créer une action associée", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);
  return idAction;
}
