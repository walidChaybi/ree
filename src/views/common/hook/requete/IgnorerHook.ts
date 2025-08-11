import { postIgnorerRequete } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IgnorerParams {
  idRequete?: string;
  texteObservation?: string;
}

export function useIgnorerApi(params?: IgnorerParams) {
  const [res, setRes] = useState<string | undefined>();
  useEffect(() => {
    if (params && params.idRequete && params.texteObservation) {
      postIgnorerRequete(params.idRequete, params.texteObservation)
        .then(result => {
          setRes(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible d'ignorer la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}
