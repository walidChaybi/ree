import { postSauvegarderDocument } from "@api/appels/requeteApi";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ISauvegarderDocumentsParams {
  documentsReponsePourStockage?: IDocumentReponse[];
  requeteId?: string;
}

export function useSauvegarderDocument(params?: ISauvegarderDocumentsParams) {
  const [uuidDocumentReponse, setUuidDocumentReponse] = useState<string>();

  useEffect(() => {
    if (params && params.requeteId && params.documentsReponsePourStockage) {
      postSauvegarderDocument(params.requeteId, params.documentsReponsePourStockage)
        .then(result => {
          setUuidDocumentReponse(result.body.data[0]);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de stocker le document et de mettre à jour le statut", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return uuidDocumentReponse;
}
