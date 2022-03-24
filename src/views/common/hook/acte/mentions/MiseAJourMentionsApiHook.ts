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
  const [fait, setFait] = useState<IMiseAJourMentionsResultat>();

  useEffect(() => {
    if (params && params.mentions) {
      postMentions(params.idActe, params.mentions)
        .then(result => {
          setFait({ resultat: true });
        })
        .catch(error => {
          setFait({ resultat: false });
          logError({
            messageUtilisateur:
              "Impossible de récupérer les mentions pour cet acte",
            error
          });
        });
    }
  }, [params]);

  return fait;
}
