import { deleteDocumentsReponseApi } from "@api/appels/requeteApi";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../../../utils/AfficherMessage";

export const useSupprimerAnciensDocumentsReponseHook = (
  idRequete?: string,
  dataRMCAutoInscription?: TResultatRMCInscription[]
): boolean => {
  const [isOldDocumentDeleted, setIsOldDocumentDeleted] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      if (idRequete && dataRMCAutoInscription) {
        try {
          await deleteDocumentsReponseApi(idRequete);
          setIsOldDocumentDeleted(true);
        } catch (erreurs) {
          AfficherMessage.erreur("Impossible de supprimer les documents réponses", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        }
      }
    };
    fetchData();
  }, [idRequete, dataRMCAutoInscription]);

  return isOldDocumentDeleted;
};
