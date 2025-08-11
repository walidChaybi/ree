import { updateDocumentMention } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export interface IMiseAJourDocumentMentionParams {
  idDocument: string;
  mentionsRetirees?: string[];
}

interface IMiseAJourDocumentMentionResultat {
  resultat?: boolean;
}

export function useMiseAJourDocumentMentionApiHook(params?: IMiseAJourDocumentMentionParams) {
  const [fait, setFait] = useState<IMiseAJourDocumentMentionResultat>();

  useEffect(() => {
    if (params) {
      updateDocumentMention(params.idDocument, params.mentionsRetirees)
        .then(result => {
          setFait({ resultat: true });
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          setFait({ resultat: false });
          AfficherMessage.erreur("Impossible de mettre à jour les mentions retirées du document ", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    } else {
      return setFait(undefined);
    }
  }, [params]);

  return fait;
}
