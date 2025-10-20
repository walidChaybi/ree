import { updateDateDerniereDelivranceRcRcaPacs } from "@api/appels/etatcivilApi";
import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IDerniereDelivranceRcRcaPacsParams {
  idRepertoire: string;
  typeRepertoire: ETypeRcRcaPacs;
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
        .catch(erreurs => {
          /* istanbul ignore next */
          setResultat({ resultat: false });
          AfficherMessage.erreur(
            "Impossible de mettre à jour la date de dernière délivrance de ce(s) certificat(s) de situation RC, RCA ou PACS",
            {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            }
          );
        });
    }
  }, [params]);

  return resultat;
}
