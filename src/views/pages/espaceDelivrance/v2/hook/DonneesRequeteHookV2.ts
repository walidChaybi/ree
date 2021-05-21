import { useEffect, useState } from "react";
import {
  getMesRequetes,
  IQueryParametersPourRequetesV2,
  TypeAppelRequete
} from "../../../../../api/appels/requeteApi";
import {
  IRequeteTableau,
  mappingRequetesTableau
} from "../../../../../model/requete/v2/IRequeteTableau";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";

export function useRequeteApi(
  queryParameters: IQueryParametersPourRequetesV2,
  typeRequete: TypeAppelRequete
) {
  const [dataState, setDataState] = useState<IRequeteTableau[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});

  useEffect(() => {
    let listeStatuts = "";

    queryParameters.statuts.forEach((statut, i) => {
      listeStatuts += statut;
      listeStatuts += i < queryParameters.statuts.length - 1 ? "," : "";
    });

    getMesRequetes(typeRequete, listeStatuts, queryParameters)
      .then(result => {
        setDataState(mappingRequetesTableau(result.body.data, false));
        setParamsTableau(getParamsTableau(result));
      })
      .catch(error => {
        logError({
          messageUtilisateur: "Impossible de récupérer les requêtes",
          error
        });
      });
  }, [queryParameters, typeRequete]);

  return {
    dataState,
    paramsTableau
  };
}
