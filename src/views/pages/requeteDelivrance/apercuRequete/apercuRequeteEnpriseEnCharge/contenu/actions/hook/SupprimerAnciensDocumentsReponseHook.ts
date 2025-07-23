import { deleteDocumentsReponseApi } from "@api/appels/requeteApi";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useSupprimerAnciensDocumentsReponseHook(idRequete?: string, dataRMCAutoInscription?: TResultatRMCInscription[]): boolean {
  const [isOldDocumentDeleted, setIsOldDocumentDeleted] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      if (idRequete && dataRMCAutoInscription) {
        try {
          await deleteDocumentsReponseApi(idRequete);
          setIsOldDocumentDeleted(true);
        } catch (error) {
          logError({
            messageUtilisateur: "Impossible de supprimer les documents réponses",
            error
          });
        }
      }
    }
    fetchData();
  }, [idRequete, dataRMCAutoInscription]);

  return isOldDocumentDeleted;
}
