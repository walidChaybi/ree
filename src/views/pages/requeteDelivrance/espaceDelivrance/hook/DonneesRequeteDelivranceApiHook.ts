import {
  getTableauRequetesDelivrance,
  IQueryParametersPourRequetes,
  postTableauRequetesDelivranceService,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  IFiltreServiceRequeteDelivranceFormValues,
  mappingFiltreServiceRequeteDelivranceVersFiltreDto
} from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
import {
  IRequeteTableauDelivrance,
  mappingRequetesTableauDelivrance
} from "@model/requete/IRequeteTableauDelivrance";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useRequeteDelivranceApiHook(
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void
) {
  const [dataState, setDataState] = useState<IRequeteTableauDelivrance[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const [filtresReq, setFiltresReq] =
    useState<IFiltreServiceRequeteDelivranceFormValues>(
      {} as IFiltreServiceRequeteDelivranceFormValues
    );

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        if (queryParameters) {
          const listeStatuts = queryParameters?.statuts?.join(",");
          const result =
            typeRequete === TypeAppelRequete.MES_REQUETES_DELIVRANCE
              ? await getTableauRequetesDelivrance(
                  typeRequete,
                  listeStatuts,
                  queryParameters
                )
              : await postTableauRequetesDelivranceService(
                  queryParameters,
                  mappingFiltreServiceRequeteDelivranceVersFiltreDto(filtresReq)
                );
          const mesRequetes = mappingRequetesTableauDelivrance(
            result?.body?.data,
            false
          );
          setDataState(mesRequetes);
          setParamsTableau(getParamsTableau(result));
          setEnChargement(false);
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes de délivrance",
          error
        });
      }
    }
    fetchMesRequetes();
  }, [queryParameters, typeRequete, setEnChargement, filtresReq]);

  function onSubmitFiltres(values: IFiltreServiceRequeteDelivranceFormValues) {
    setFiltresReq({ ...values });
  }

  return {
    dataState,
    paramsTableau,
    onSubmitFiltres
  };
}
