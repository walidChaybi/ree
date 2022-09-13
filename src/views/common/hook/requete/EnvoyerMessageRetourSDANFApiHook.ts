import { postMessageRetourSDANF } from "@api/appels/requeteApi";
import { IEchange } from "@model/requete/IEchange";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface RetourSDANFParams {
  idRequete: string;
  message: IEchange;
}

export function useEnvoyerMessageRetourSDANFApiHook(
  params?: RetourSDANFParams
) {
  const [res, setRes] = useState<any>();
  useEffect(() => {
    if (params) {
      postMessageRetourSDANF(params.idRequete, params.message)
        .then(result => {
          setRes(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible d'envoyer le message"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}
