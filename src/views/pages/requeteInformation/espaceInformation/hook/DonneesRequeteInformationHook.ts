import { useEffect, useState } from "react";
import {
  getMesRequetesInformation,
  IQueryParametersPourRequetesV2
} from "../../../../../api/appels/requeteApi";
import {
  IRequeteTableauInformation,
  mappingRequetesTableauInformation
} from "../../../../../model/requete/v2/IRequeteTableauInformation";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";

export function useRequeteInformationApi(
  queryParameters: IQueryParametersPourRequetesV2,
  setEnChargement: (enChargement: boolean) => void
) {
  const [dataState, setDataState] = useState<IRequeteTableauInformation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        const listeStatuts = queryParameters?.statuts?.join(",");
        const result = await getMesRequetesInformation(
          listeStatuts,
          queryParameters
        );
        const mesRequetes = mappingRequetesTableauInformation(
          result?.body?.data,
          false
        );
        setDataState(mesRequetes);
        setParamsTableau(getParamsTableau(result));
        setEnChargement(false);
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes d'information",
          error
        });
      }
    }
    fetchMesRequetes();
  }, [queryParameters, setEnChargement]);

  return {
    dataState,
    paramsTableau
  };
}
