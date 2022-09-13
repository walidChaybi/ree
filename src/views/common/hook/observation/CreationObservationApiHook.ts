import { postObservation } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface ICreationObservationParams {
  idRequete: string;
  texteObservation?: string;
  idObservation?: string;
}

interface ICreationObservationResultat {
  id: string;
}

export function useCreationObservationApi(params?: ICreationObservationParams) {
  const [resultat, setResultat] = useState<
    ICreationObservationResultat | undefined
  >();
  useEffect(() => {
    async function fetchData() {
      if (params && params.texteObservation && params.idRequete) {
        try {
          const result = await postObservation(
            params.idRequete,
            params.texteObservation,
            params.idObservation
          );
          setResultat({ id: result.body.data });
        } catch (error) {
          logError({
            messageUtilisateur: "Impossible de créer l'observation",
            error
          });
        }
      }
    }
    fetchData();
  }, [params]);

  return resultat;
}
