import { postMessageRetourSDANFEtUpdateStatutRequete } from "@api/appels/requeteApi";
import { IEchange } from "@model/requete/IEchange";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { mapEchangeRetourSDANF } from "../DetailRequeteHook";

export interface RetourSDANFParams {
  idRequete: string;
  message: IEchange;
}

export function useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook(params?: RetourSDANFParams): IEchange {
  const [messageSdanf, setMessageSdanf] = useState<IEchange>();
  useEffect(() => {
    if (params) {
      postMessageRetourSDANFEtUpdateStatutRequete(params.idRequete, params.message)
        .then(result => {
          setMessageSdanf(mapEchangeRetourSDANF(result.body.data));
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible d'envoyer le message et de mettre à jour le statut", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return messageSdanf as IEchange;
}
