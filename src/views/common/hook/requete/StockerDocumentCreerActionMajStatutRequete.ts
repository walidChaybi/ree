import { patchSauvDocumentCreerActionMajStatutRequete } from "@api/appels/requeteApi";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IStockerDocumentCreerActionMajStatutRequeteParams {
  libelleAction: string;
  statutRequete: StatutRequete;
  documentReponsePourStockage?: IDocumentReponse;
  requeteId?: string;
}

export function useStockerDocumentCreerActionMajStatutRequete(params?: IStockerDocumentCreerActionMajStatutRequeteParams) {
  const [uuidDocumentReponse, setUuidDocumentReponse] = useState<string>();
  // 4- Une fois le document stocké, création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(() => {
    if (params && params.requeteId && params.libelleAction && params.statutRequete && params.documentReponsePourStockage) {
      patchSauvDocumentCreerActionMajStatutRequete(
        params.requeteId,
        params.libelleAction,
        params.statutRequete,
        params.documentReponsePourStockage
      )
        .then(result => {
          setUuidDocumentReponse(result.body.data[0]);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de stocker le document et de mettre à jour le statut", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [params]);

  return uuidDocumentReponse;
}
