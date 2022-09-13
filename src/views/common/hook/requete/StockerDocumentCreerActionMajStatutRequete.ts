import { postSauvDocumentCreerActionMajStatutRequete } from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IStockerDocumentCreerActionMajStatutRequeteParams {
  libelleAction: string;
  statutRequete: StatutRequete;
  documentReponsePourStockage?: IDocumentReponse;
  requeteId?: string;
}

export function useStockerDocumentCreerActionMajStatutRequete(
  params?: IStockerDocumentCreerActionMajStatutRequeteParams
) {
  const [uuidDocumentReponse, setUuidDocumentReponse] = useState<string>();
  // 4- Une fois le document stocké, création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(() => {
    if (
      params &&
      params.requeteId &&
      params.libelleAction &&
      params.statutRequete &&
      params.documentReponsePourStockage
    ) {
      postSauvDocumentCreerActionMajStatutRequete(
        params.requeteId,
        params.libelleAction,
        params.statutRequete,
        params.documentReponsePourStockage
      )
        .then(result => {
          setUuidDocumentReponse(result.body.data[0]);
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de stocker le document et de mettre à jour le statut",
            error
          });
        });
    }
  }, [params]);

  return uuidDocumentReponse;
}
