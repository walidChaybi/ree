import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { patchModificationAvancementProjet } from "../../../../api/appels/requeteApi";

export interface IModifierAvancementProjetActeParams {
  idSuiviDossier: string;
  avancement: AvancementProjetActe;
}

export const useModifierAvancementSuiviDossierApiHook = (
  params?: IModifierAvancementProjetActeParams
) => {
  const [codeReponse, setCodeReponse] = useState<number>();

  useEffect(() => {
    if (params) {
      patchModificationAvancementProjet(
        params.idSuiviDossier,
        AvancementProjetActe.getKey(params.avancement)
      )
        .then(reponse => setCodeReponse(reponse.status))
        .catch((error: any) => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de mettre à jour l'avancement du suivi dossier."
          });
        });
    }
  }, [params]);

  return codeReponse;
};
