import { postMentions } from "@api/appels/etatcivilApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export interface IMiseAJourMentionsParams {
  idActe: string;
  mentions?: any[];
}

export interface IMiseAJourMentionsResultat {
  resultat?: boolean;
}

export function useMiseAJourMentionsApiHook(params?: IMiseAJourMentionsParams) {
  const [fini, setFini] = useState<IMiseAJourMentionsResultat>();

  useEffect(() => {
    if (params && params.mentions) {
      postMentions(params.idActe, params.mentions)
        .then(result => {
          setFini({ resultat: true });
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          setFini({ resultat: false });
          AfficherMessage.erreur("Impossible de mettre à jour les mentions de cet acte ", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return fini;
}
