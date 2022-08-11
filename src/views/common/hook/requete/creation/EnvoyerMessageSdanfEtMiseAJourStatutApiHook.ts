import { useEffect, useState } from "react";
import { postMessageRetourSDANFEtUpdateStatutRequete } from "../../../../../api/appels/requeteApi";
import { IEchange } from "../../../../../model/requete/IEchange";
import { logError } from "../../../util/LogManager";

export interface RetourSDANFParams {
  idRequete: string;
  message: IEchange;
}

export function useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook(
  params?: RetourSDANFParams
) {
  const [res, setRes] = useState<any>();
  useEffect(() => {
    if (params) {
      postMessageRetourSDANFEtUpdateStatutRequete(
        params.idRequete,
        params.message
      )
        .then(result => {
          setRes(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible d'envoyer le message et de mettre à jour le statut"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}
