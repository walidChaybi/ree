import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { useEffect, useState } from "react";
import { patchModificationAvancementProjet } from "../../../../api/appels/requeteApi";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IModifierAvancementProjetActeParams {
  idSuiviDossier: string;
  avancement: AvancementProjetActe;
}

export const useModifierAvancementSuiviDossierApiHook = (params?: IModifierAvancementProjetActeParams) => {
  const [codeReponse, setCodeReponse] = useState<number>();

  useEffect(() => {
    if (params) {
      patchModificationAvancementProjet(params.idSuiviDossier, AvancementProjetActe.getKey(params.avancement))
        .then(reponse => setCodeReponse(reponse.status))
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de mettre à jour l'avancement du suivi dossier.", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return codeReponse;
};
