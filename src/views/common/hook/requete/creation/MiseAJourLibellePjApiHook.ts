import { patchMiseAJourLibellePJ } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IMajLibellePjParams {
  idPJ: string;
  libelle: string;
  nouveauLibelle: string;
}

export function useMiseAJourLibellePjApiHook(params?: IMajLibellePjParams) {
  const [resultat, setResultat] = useState<boolean>(false);

  useEffect(() => {
    if (params && params.libelle !== params.nouveauLibelle) {
      patchMiseAJourLibellePJ(params.idPJ, params.nouveauLibelle)
        .then(() => {
          setResultat(true);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de mettre à jour le libellé de la pièce jointe"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
}
