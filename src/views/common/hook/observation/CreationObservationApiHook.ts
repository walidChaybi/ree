import { postObservation } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ICreationObservationParams {
  idRequete: string;
  texteObservation?: string;
  idObservation?: string;
}

interface ICreationObservationResultat {
  id: string;
}

export const useCreationObservationApi = (params?: ICreationObservationParams) => {
  const [resultat, setResultat] = useState<ICreationObservationResultat | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      if (params && params.texteObservation && params.idRequete) {
        try {
          const result = await postObservation(params.idRequete, params.texteObservation, params.idObservation);
          setResultat({ id: result.body.data });
        } catch (erreurs) {
          AfficherMessage.erreur("Impossible de créer l'observation", {
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
