import { saveCodeCtv } from "@api/appels/televerificationApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../utils/AfficherMessage";

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
          .catch(erreurs => {
            /* istanbul ignore next */
            AfficherMessage.erreur("Impossible de stocker le code Ctv", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            });
          });
      } else {
        setRes({ resultat: true });
      }
    }
  }, [params]);

  return res;
}
