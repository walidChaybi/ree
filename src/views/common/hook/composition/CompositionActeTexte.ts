import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { compositionApi } from "@api/appels/compositionApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { logError } from "@util/LogManager";
import { getLibelle, ZERO } from "@util/Utils";
import { useEffect, useState } from "react";

export interface ICompositionActeTexteParams {
  acteTexteJson: string;
}

interface ICompositionActeTexteResultat {
  donneesComposition?: IDonneesComposition;
  erreur?: string;
}

export const useCompositionActeTexteApiHook = (
  params?: ICompositionActeTexteParams
) => {
  const [resultat, setResultat] = useState<ICompositionActeTexteResultat>();

  useEffect(() => {
    if (params) {
      compositionApi
        .getCompositionActeTexte(params.acteTexteJson)
        .then(reponse => {
          setResultat(
            reponse.body.size === ZERO
              ? {
                  erreur: getLibelle(
                    "La visualisation de l'acte n'est pas disponible"
                  )
                }
              : {
                  donneesComposition: reponse.body.data
                }
          );
        })
        .catch(error => {
          if (error?.response.status === HTTP_NOT_FOUND) {
            setResultat({
              erreur: getLibelle(
                "La visualisation de l'acte n'est pas disponible"
              )
            });
          } else {
            logError({
              error,
              messageUtilisateur: getLibelle(
                "Impossible d'obtenir les informations de l'acte"
              )
            });
          }
        });
    }
  }, [params]);

  return resultat;
};
