import { patchMiseAJourLibellePJ } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export interface IMajLibellePjParams {
  idPJ: string;
  libelle: string;
  nouveauLibelle: string;
}
interface IMajLibellePjResultat {
  resultat: boolean;
}

export const useMiseAJourLibellePjApiHook = (params?: IMajLibellePjParams) => {
  const [resultat, setResultat] = useState<IMajLibellePjResultat>();

  useEffect(() => {
    if (params && params.libelle !== params.nouveauLibelle) {
      patchMiseAJourLibellePJ(params.idPJ, params.nouveauLibelle)
        .then(() => {
          setResultat({ resultat: true });
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de mettre à jour le libellé de la pièce jointe", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
};
