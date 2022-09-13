import { deleteDocumentsReponseApi } from "@api/appels/requeteApi";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useSupprimerAnciensDocumentsReponseHook(
  idRequete?: string,
  dataRMCAutoInscription?: IResultatRMCInscription[]
): boolean {
  const [isOldDocumentDeleted, setIsOldDocumentsDeleted] =
    useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      if (idRequete && dataRMCAutoInscription) {
        try {
          await deleteDocumentsReponseApi(idRequete);
          setIsOldDocumentsDeleted(true);
        } catch (error) {
          logError({
            messageUtilisateur:
              "Impossible de supprimer les documents réponses",
            error
          });
        }
      }
    }
    fetchData();
  }, [idRequete, dataRMCAutoInscription]);

  return isOldDocumentDeleted;
}
