import { getCodeCtv } from "@api/appels/televerificationApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../utils/AfficherMessage";

interface IRecupererCTVResultat {
  ctv: string;
}

export function useRecupererCTV(params?: {}): IRecupererCTVResultat | undefined {
  const [res, setRes] = useState<IRecupererCTVResultat>();

  useEffect(() => {
    if (params) {
      getCodeCtv()
        .then(result => {
          setRes({ ctv: result.body.data });
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          AfficherMessage.erreur("Impossible de récupérer le code Ctv", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return res;
}
