import { patchMiseAJourLibellePJ } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IMajLibellePjParams {
  idPJ: string;
  libelle: string;
  nouveauLibelle: string;
}
interface IMajLibellePjResultat {
  resultat: boolean;
}

export function useMiseAJourLibellePjApiHook(params?: IMajLibellePjParams) {
  const [resultat, setResultat] = useState<IMajLibellePjResultat>();

  useEffect(() => {
    if (params && params.libelle !== params.nouveauLibelle) {
      patchMiseAJourLibellePJ(params.idPJ, params.nouveauLibelle)
        .then(() => {
          setResultat({ resultat: true });
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible de mettre à jour le libellé de la pièce jointe"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
}
