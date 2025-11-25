import { patchMiseAJourIdSuiviDossier } from "@api/appels/requeteApi";
import { useEffect } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IMiseAJourSuiviDossierParams {
  idSuiviDossier: string;
  idActe: string;
}

export const useMiseAJourSuiviDossierApiHook = (params?: IMiseAJourSuiviDossierParams) => {
  useEffect(() => {
    if (params?.idActe && params?.idSuiviDossier) {
      patchMiseAJourIdSuiviDossier(params.idSuiviDossier, params.idActe)
        .then(res => {
          AfficherMessage.succes("L'enregistrement du projet s'est bien déroulé", { fermetureAuto: true });
        })
        .catch(erreurs => {
          AfficherMessage.erreur(`Impossible de mettre a jour l'id d'acte du suiviDossier associé à l'id: ${params.idSuiviDossier}`, {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);
};
