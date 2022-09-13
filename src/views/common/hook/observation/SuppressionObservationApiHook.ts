import { deleteObservation } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface ISuppressionObservationParams {
  idObservation?: string;
}

interface ISuppressionObservationResultat {
  resultat: boolean;
}

export function useSuppressionObservationApi(
  params?: ISuppressionObservationParams
) {
  const [resultat, setResultat] = useState<
    ISuppressionObservationResultat | undefined
  >();
  useEffect(() => {
    async function fetchData() {
      if (params && params.idObservation) {
        try {
          const result = await deleteObservation(params.idObservation);
          setResultat({ resultat: result.body.data });
        } catch (error) {
          setResultat({ resultat: false });
          logError({
            messageUtilisateur: "Impossible de supprimer l'observation",
            error
          });
        }
      }
    }
    fetchData();
  }, [params]);

  return resultat;
}
