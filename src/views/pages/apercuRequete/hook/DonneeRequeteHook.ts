import { useState, useEffect } from "react";
import { reponseRequeteMapperUnitaire } from "../../espaceDelivrance/hook/DonneesRequeteHook";
import { RequestsInformations } from "../ApercuRequetePage";
import { IDataTable } from "../../espaceDelivrance/MesRequetesPage";
import { getRequete } from "../../../../api/appels/requeteApi";
import { IQueryParametersPourRequete } from "../../../common/widget/signature/hook/SignatureDocumentHook";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";

export function useRequeteDataApi(
  queryParameters: IQueryParametersPourRequete,
  officier?: IOfficierSSOApi,
  requestsInformations?: RequestsInformations
) {
  const [dataState, setDataState] = useState<IDataTable[]>(
    requestsInformations ? requestsInformations.data : []
  );
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    setErrorState(undefined);
    setDataState([]);
    if (requestsInformations === undefined) {
      if (officier !== undefined) {
        getRequete(officier, queryParameters.idRequete, queryParameters.statut)
          .then(result => {
            const tmp = reponseRequeteMapperUnitaire(result.body.data);
            setDataState([tmp]);
          })
          .catch(error => {
            setErrorState(error);
          });
      }
    } else {
      setDataState(requestsInformations.data);
    }
  }, [
    queryParameters.idRequete,
    queryParameters.statut,
    requestsInformations,
    officier
  ]);
  return {
    dataState,
    errorState
  };
}
