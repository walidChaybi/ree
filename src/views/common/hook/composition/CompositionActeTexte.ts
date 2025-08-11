import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { compositionApi } from "@api/appels/compositionApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ICompositionActeTexteParams {
  acteTexteJson: string;
}

interface ICompositionActeTexteResultat {
  donneesComposition?: IDonneesComposition;
  erreur?: string;
}

export const useCompositionActeTexteApiHook = (params?: ICompositionActeTexteParams) => {
  const [resultat, setResultat] = useState<ICompositionActeTexteResultat>();

  useEffect(() => {
    if (params) {
      compositionApi
        .getCompositionActeTexte(params.acteTexteJson)
        .then(reponse => {
          setResultat(
            reponse.body.size === ZERO
              ? {
                  erreur: "La visualisation de l'acte n'est pas disponible"
                }
              : {
                  donneesComposition: reponse.body.data
                }
          );
        })
        .catch(erreurs => {
          if (erreurs?.response.status === HTTP_NOT_FOUND) {
            setResultat({
              erreur: "La visualisation de l'acte n'est pas disponible"
            });
          } else {
            AfficherMessage.erreur("Impossible d'obtenir les informations de l'acte", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            });
          }
        });
    }
  }, [params]);

  return resultat;
};
