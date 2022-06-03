import { useEffect, useState } from "react";
import { postMentions } from "../../../../../api/appels/etatcivilApi";
import { logError } from "../../../util/LogManager";

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
        .catch(error => {
          /* istanbul ignore next */
          setFini({ resultat: false });
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour les mentions de cet acte ",
            error
          });
        });
    }
  }, [params]);

  return fini;
}
