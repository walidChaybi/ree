import {
  getRequetesCreation,
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  IRequeteTableauCreation,
  mappingUneRequeteTableauCreation
} from "@model/requete/IRequeteTableauCreation";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useRequeteCreationApi(
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void
) {
  const [dataState, setDataState] = useState<IRequeteTableauCreation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        const listeStatuts = queryParameters?.statuts?.join(",");
        const result = await getRequetesCreation(
          listeStatuts,
          typeRequete,
          queryParameters
        );
        const mesRequetes = mappingRequetesTableauCreation(
          result?.body?.data,
          false
        );
        setDataState(mesRequetes);
        setParamsTableau(getParamsTableau(result));
        setEnChargement(false);
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes de création",
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

function mappingRequetesTableauCreation(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): IRequeteTableauCreation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauCreation(requete, mappingSupplementaire);
  });
}
