import { patchMiseAJourIdSuiviDossier } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { useEffect } from "react";

export interface IMiseAJourSuiviDossierParams {
  idSuiviDossier: string;
  idActe: string;
}

export function useMiseAJourSuiviDossierApiHook(
  params?: IMiseAJourSuiviDossierParams
) {
  useEffect(() => {
    if (params?.idActe && params?.idSuiviDossier) {
      patchMiseAJourIdSuiviDossier(params.idSuiviDossier, params.idActe)
        .then(res => {
          messageManager.showSuccessAndClose(
            "L'enregistrement du projet s'est bien déroulé"
          );
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: `Impossible de mettre a jour l'id d'acte du suiviDossier associé à l'id: ${params.idSuiviDossier}`
          });
        });
    }
  }, [params]);
}
