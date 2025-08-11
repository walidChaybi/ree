import { postTransfertValideur } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ITransmettreAValideurParams {
  libelleAction: string;
  texteObservation: string;
  idUtilisateur: string;
  requeteId: string;
}

export function useTransmettreAValideurApiHook(params?: ITransmettreAValideurParams) {
  const [idAction, setIdAction] = useState<string | undefined>();
  useEffect(() => {
    if (params) {
      postTransfertValideur(params.requeteId, params.idUtilisateur, params.libelleAction, params.texteObservation)
        .then(result => {
          setIdAction(result.body.data);
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          AfficherMessage.erreur("Impossible de transmettre la requête au valideur", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
}
