import { useEffect, useState } from "react";
import {
  getMesRequetesDelivrance,
  IQueryParametersPourRequetesV2,
  TypeAppelRequete
} from "../../../../../../api/appels/requeteApi";
import {
  IRequeteTableauDelivrance,
  mappingRequetesTableau
} from "../../../../../../model/requete/v2/IRequeteTableauDelivrance";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../../common/util/LogManager";

export function useRequeteDelivranceApi(
  queryParameters: IQueryParametersPourRequetesV2,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void
) {
  const [dataState, setDataState] = useState<IRequeteTableauDelivrance[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        const listeStatuts = queryParameters?.statuts?.join(",");
        const result = await getMesRequetesDelivrance(
          typeRequete,
          listeStatuts,
          queryParameters
        );
        const mesRequetes = mappingRequetesTableau(result?.body?.data, false);
        setDataState(mesRequetes);
        setParamsTableau(getParamsTableau(result));
        setEnChargement(false);
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes de délivrance",
          error
        });
      }
    }
    fetchMesRequetes();
  }, [queryParameters, typeRequete, setEnChargement]);

  return {
    dataState,
    paramsTableau
  };
}
