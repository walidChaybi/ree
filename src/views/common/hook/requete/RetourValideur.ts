import { postRetourValideur } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

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
      postRetourValideur(
        params.requeteId,
        params.statutDemande,
        params.libelleAction,
        params.texteObservation
      )
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(error => {
          /* istanbul ignore next */
          logError({
            error,
            messageUtilisateur: "Impossible de renvoyer la requête"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
}
