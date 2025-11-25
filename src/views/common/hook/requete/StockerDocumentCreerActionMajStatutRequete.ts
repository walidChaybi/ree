import { CONFIG_PATCH_STOCKER_DOCUMENT_DELIVRANCE } from "@api/configurations/requete/delivrance/PatchStockerDocumentDelivranceConfigApi";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

export interface IStockerDocumentCreerActionMajStatutRequeteParams {
  libelleAction: string;
  statutRequete: StatutRequete;
  documentReponsePourStockage?: IDocumentReponse;
  requeteId?: string;
}

export const useStockerDocumentCreerActionMajStatutRequete = (params?: IStockerDocumentCreerActionMajStatutRequeteParams) => {
  const [uuidDocumentReponse, setUuidDocumentReponse] = useState<string>();

  const { appelApi: patchStockerDocumentDelivrance } = useFetchApi(CONFIG_PATCH_STOCKER_DOCUMENT_DELIVRANCE);

  // 4- Une fois le document stocké, création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(() => {
    if (params && params.requeteId && params.libelleAction && params.statutRequete && params.documentReponsePourStockage) {
      patchStockerDocumentDelivrance({
        parametres: {
          path: { idRequete: params.requeteId },
          query: { libelleAction: params.libelleAction, statutRequete: StatutRequete.getKey(params.statutRequete) },
          body: params.documentReponsePourStockage
        },
        apresSucces: resultat => {
          setUuidDocumentReponse(resultat[0]);
        },
        apresErreur: erreurs => {
          AfficherMessage.erreur("Impossible de stocker le document et de mettre à jour le statut", { erreurs });
        }
      });
    }
  }, [params]);

  return uuidDocumentReponse;
};
