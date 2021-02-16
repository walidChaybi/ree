import { useState, useEffect } from "react";
import { rechercheMultiCriteresActes } from "../../../../api/appels/etatcivilApi";
import { IResultatRMCActe } from "../../../../model/rmc/IResultatRMCActe";
import { IRMCActeInscription } from "../../../../model/rmc/IRMCActeInscription";
import messageManager from "../../../common/util/messageManager";
import { mappingActes, mappingCriteres } from "../RMCActeInscriptionUtils";

export function useRMCActeApiHook(
  criteres: IRMCActeInscription,
  range?: string
) {
  const [dataRMCActe, setDataRMCActe] = useState<IResultatRMCActe[]>();

  useEffect(() => {
    if (criteres != null) {
      // Recherche dans les actes
      const criteresRequest = mappingCriteres(criteres);
      rechercheMultiCriteresActes(criteresRequest)
        .then((result: any) => {
          setDataRMCActe(mappingActes(result.body.data.registres));
        })
        .catch((error: any) => {
          messageManager.showErrorAndClose(
            "Impossible récupérer les actes de la recherche multi-critères"
          );
        });
    }
  }, [criteres]);

  return {
    dataRMCActe
  };
}
