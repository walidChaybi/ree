import { postMessageRetourSDANFEtUpdateStatutRequete } from "@api/appels/requeteApi";
import { mapEchangeRetourSDANF } from "@hook/requete/DetailRequeteHook";
import { IEchange } from "@model/requete/IEchange";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface RetourSDANFParams {
  idRequete: string;
  message: IEchange;
}

export function useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook(
  params?: RetourSDANFParams
): IEchange {
  const [messageSdanf, setMessageSdanf] = useState<IEchange>();
  useEffect(() => {
    if (params) {
      postMessageRetourSDANFEtUpdateStatutRequete(
        params.idRequete,
        params.message
      )
        .then(result => {
          setMessageSdanf(mapEchangeRetourSDANF(result.body.data));
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
  return messageSdanf as IEchange;
}
