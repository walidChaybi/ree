import { useEffect, useState } from "react";
import { updateDocumentMention } from "../../../../../api/appels/requeteApi";
import { logError } from "../../../util/LogManager";

export interface IMiseAJourDocumentMentionParams {
  idDocument: string;
  mentionsRetirees?: string[];
}

export interface IMiseAJourDocumentMentionResultat {
  resultat?: boolean;
}

export function useMiseAJourDocumentMentionApiHook(
  params?: IMiseAJourDocumentMentionParams
) {
  const [fait, setFait] = useState<IMiseAJourDocumentMentionResultat>();

  useEffect(() => {
    if (params) {
      updateDocumentMention(params.idDocument, params.mentionsRetirees)
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
