import { updateDateDerniereDelivranceRcRcaPacs } from "@api/appels/etatcivilApi";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IDerniereDelivranceRcRcaPacsParams {
  idRepertoire: string;
  typeRepertoire: ETypePacsRcRca;
}

interface IDerniereDelivranceRcRcaPacsResultat {
  resultat: boolean;
}

export function useDerniereDelivranceRcRcaPacsApiHook(params?: IDerniereDelivranceRcRcaPacsParams[]) {
  const [resultat, setResultat] = useState<IDerniereDelivranceRcRcaPacsResultat>();

  useEffect(() => {
    if (params?.length) {
      updateDateDerniereDelivranceRcRcaPacs(params)
        .then(result => {
          setResultat({ resultat: true });
        })
        .catch(error => {
          /* istanbul ignore next */
          setResultat({ resultat: false });
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour la date de dernière délivrance de ce(s) certificat(s) de situation RC, RCA ou PACS",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
