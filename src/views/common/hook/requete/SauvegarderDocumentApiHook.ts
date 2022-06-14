import { useEffect, useState } from "react";
import { postSauvegarderDocument } from "../../../../api/appels/requeteApi";
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import { logError } from "../../util/LogManager";

export interface ISauvegarderDocumentsParams {
  documentsReponsePourStockage?: IDocumentReponse[];
  requeteId?: string;
}

export function useSauvegarderDocument(params?: ISauvegarderDocumentsParams) {
  const [uuidDocumentReponse, setUuidDocumentReponse] = useState<string>();

  useEffect(() => {
    if (params && params.requeteId && params.documentsReponsePourStockage) {
      postSauvegarderDocument(
        params.requeteId,
        params.documentsReponsePourStockage
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
