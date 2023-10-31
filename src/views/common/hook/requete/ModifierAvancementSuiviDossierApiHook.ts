import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { useEffect } from "react";
import { patchModificationAvancementProjet } from "../../../../api/appels/requeteApi";

export interface IModifierAvancementProjetActeParams {
  idSuiviDossier: string;
  avancement: AvancementProjetActe;
}

export const useModifierAvancementSuiviDossierApiHook = (
  params?: IModifierAvancementProjetActeParams
) => {
  useEffect(() => {
    if (params) {
      patchModificationAvancementProjet(
        params.idSuiviDossier,
        AvancementProjetActe.getKey(params.avancement)
      );
    }
  }, [params]);
};
