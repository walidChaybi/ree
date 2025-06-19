import { saveCodeCtv } from "@api/appels/televerificationApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IStockeCTVParams {
  ctv: string;
  idDocument: string;
}

interface IStockeCTVResultat {
  resultat: boolean;
}

export function useStockeCTV(params?: IStockeCTVParams): IStockeCTVResultat | undefined {
  const [res, setRes] = useState<IStockeCTVResultat>();

  useEffect(() => {
    if (params) {
      if (params.ctv) {
        saveCodeCtv(params.ctv, params.idDocument)
          .then(result => {
            setRes({ resultat: true });
          })
          .catch(error => {
            /* istanbul ignore next */
            logError({
              messageUtilisateur: "Impossible de stocker le code Ctv",
              error
            });
          });
      } else {
        setRes({ resultat: true });
      }
    }
  }, [params]);

  return res;
}
