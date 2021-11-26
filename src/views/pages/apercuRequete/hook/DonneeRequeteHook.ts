import { useEffect, useState } from "react";
import { getRequete } from "../../../../api/appels/requeteApi";
import { IDataTable } from "../../../../model/requete/IDataTable";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { logError } from "../../../common/util/LogManager";
import { reponseRequeteMapperUnitaire } from "../../espaceDelivrance/v1/hook/DonneesRequeteHook";
import { RequestsInformations } from "../ApercuRequetePage";

export interface IQueryParametersPourRequete {
  statut?: StatutRequete;
  idRequete: string;
}

export function useRequeteDataApi(
  queryParameters: IQueryParametersPourRequete,
  requestsInformations?: RequestsInformations
) {
  const [dataState, setDataState] = useState<IDataTable[]>(
    requestsInformations ? requestsInformations.data : []
  );

  useEffect(() => {
    setDataState([]);
    if (requestsInformations === undefined) {
      getRequete(queryParameters.idRequete, queryParameters.statut)
        .then(result => {
          const tmp = reponseRequeteMapperUnitaire(result.body.data);
          setDataState([tmp]);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de récupérer de la requête",
            error
          });
        });
    } else {
      setDataState(requestsInformations.data);
    }
  }, [queryParameters.idRequete, queryParameters.statut, requestsInformations]);
  return {
    dataState
  };
}
