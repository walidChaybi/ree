import { useEffect, useState } from "react";
import { postIgnorerRequete } from "../../../../../api/appels/requeteApi";
import { logError } from "../../../util/LogManager";

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
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible d'ignorer la requête"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}
