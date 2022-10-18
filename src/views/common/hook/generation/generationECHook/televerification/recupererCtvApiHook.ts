import { getCodeCtv } from "@api/appels/televerificationApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IRecupererCTVResultat {
  ctv: string;
}

export function useRecupererCTV(params?: {}):
  | IRecupererCTVResultat
  | undefined {
  const [res, setRes] = useState<IRecupererCTVResultat>();

  useEffect(() => {
    if (params) {
      getCodeCtv()
        .then(result => {
          setRes({ ctv: result.body.data });
        })
        .catch(error => {
          /* istanbul ignore next */
          logError({
            messageUtilisateur: "Impossible de récupérer le code Ctv",
            error
          });
        });
    }
  }, [params]);

  return res;
}
