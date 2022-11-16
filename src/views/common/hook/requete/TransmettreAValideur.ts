import { postTransfertValideur } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface ITransmettreAValideurParams {
  libelleAction: string;
  texteObservation: string;
  idUtilisateur: string;
  requeteId: string;
}

export function useTransmettreAValideurApiHook(
  params?: ITransmettreAValideurParams
) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params) {
      postTransfertValideur(
        params.requeteId,
        params.idUtilisateur,
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
            messageUtilisateur:
              "Impossible de transmettre la requête au valideur"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
}
