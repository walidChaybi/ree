import { postRetourValideur } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IRetourValideurParams {
  libelleAction: string;
  texteObservation: string;
  statutDemande: string;
  requeteId: string;
}

export function useRetourValideurApiHook(params?: IRetourValideurParams) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params) {
      postRetourValideur(params.requeteId, params.statutDemande, params.libelleAction, params.texteObservation)
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          AfficherMessage.erreur("Impossible de renvoyer la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
}
