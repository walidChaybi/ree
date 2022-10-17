import { patchMiseAJourLibellePJ } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect } from "react";

export interface IMajLibellePjParams {
  idPJ: string;
  libelle: string;
  nouveauLibelle: string;
}

export function useMiseAJourLibellePjApiHook(params?: IMajLibellePjParams) {
  useEffect(() => {
    if (params && params.libelle !== params.nouveauLibelle) {
      patchMiseAJourLibellePJ(params.idPJ, params.nouveauLibelle).catch(
        error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de mettre à jour le libellé de la pièce jointe"
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
}
