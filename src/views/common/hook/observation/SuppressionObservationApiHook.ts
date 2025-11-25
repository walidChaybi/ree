import { deleteObservation } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ISuppressionObservationParams {
  idObservation?: string;
}

interface ISuppressionObservationResultat {
  resultat: boolean;
}

export const useSuppressionObservationApi = (params?: ISuppressionObservationParams) => {
  const [resultat, setResultat] = useState<ISuppressionObservationResultat | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      if (params && params.idObservation) {
        try {
          const result = await deleteObservation(params.idObservation);
          setResultat({ resultat: result.body.data });
        } catch (erreurs) {
          setResultat({ resultat: false });
          AfficherMessage.erreur("Impossible de supprimer l'observation", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        }
      }
    };
    fetchData();
  }, [params]);

  return resultat;
};
