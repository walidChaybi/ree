import { useState, useEffect } from "react";
import { reponseRequeteMapperUnitaire } from "../../espaceDelivrance/v1/hook/DonneesRequeteHook";
import { RequestsInformations } from "../ApercuRequetePage";
import { IDataTable } from "../../../../model/requete/IDataTable";
import { getRequete } from "../../../../api/appels/requeteApi";
import { IQueryParametersPourRequete } from "../../../common/widget/signature/hook/SignatureDocumentHook";
import { logError } from "../../../common/util/LogManager";

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
