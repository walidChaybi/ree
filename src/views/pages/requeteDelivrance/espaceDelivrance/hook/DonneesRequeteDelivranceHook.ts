import { useEffect, useState } from "react";
import {
  getMesRequetesDelivrance,
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../../api/appels/requeteApi";
import {
  IRequeteTableauDelivrance,
  mappingRequetesTableauDelivrance
} from "../../../../../model/requete/IRequeteTableauDelivrance";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";

export function useRequeteDelivranceApi(
  queryParameters: IQueryParametersPourRequetes,
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
        const mesRequetes = mappingRequetesTableauDelivrance(
          result?.body?.data,
          false
        );
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
