import { useState, useEffect } from "react";
import { rechercheMultiCriteresInscriptions } from "../../../../api/appels/etatcivilApi";
import { IResultatRMCInscription } from "../../../../model/rmc/resultat/IResultatRMCInscription";
import { IRMCActeInscription } from "../../../../model/rmc/rechercheForm/IRMCActeInscription";
import messageManager from "../../../common/util/messageManager";
import {
  mappingCriteres,
  mappingInscriptions
} from "../RMCActeInscriptionUtils";

export function useRMCInscriptionApiHook(
  criteres: IRMCActeInscription,
  range?: string
) {
  const [dataRMCInscription, setDataRMCInscription] = useState<
    IResultatRMCInscription[]
  >();

  useEffect(() => {
    if (criteres != null) {
      const criteresRequest = mappingCriteres(criteres);
      // Recherche dans les inscriptions
      rechercheMultiCriteresInscriptions(criteresRequest)
        .then((result: any) => {
          setDataRMCInscription(
            mappingInscriptions(result.body.data.repertoiresCiviles)
          );
        })
        .catch((error: any) => {
          messageManager.showErrorAndClose(
            "Impossible récupérer les inscriptions de la recherche multi-critères"
          );
        });
    }
  }, [criteres]);

  return {
    dataRMCInscription
  };
}
