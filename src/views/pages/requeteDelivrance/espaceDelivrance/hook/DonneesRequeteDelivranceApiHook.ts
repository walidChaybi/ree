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
import { NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useEffect, useState } from "react";

export function useRequeteDelivranceApiHook(
  parametresLienRequete: IQueryParametersPourRequetes | undefined,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void,
  setParametresLienRequete?: React.Dispatch<
    React.SetStateAction<IQueryParametersPourRequetes | undefined>
  >
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
        if (parametresLienRequete) {
          setEnChargement(true);
          const listeStatuts = parametresLienRequete?.statuts?.join(",");
          const result =
            typeRequete === TypeAppelRequete.MES_REQUETES_DELIVRANCE
              ? await getTableauRequetesDelivrance(
                  typeRequete,
                  listeStatuts,
                  parametresLienRequete
                )
              : await postTableauRequetesDelivranceService(
                  parametresLienRequete,
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
  }, [parametresLienRequete, typeRequete, setEnChargement, filtresReq]);

  function onSubmitFiltres(values: IFiltreServiceRequeteDelivranceFormValues) {
    setFiltresReq({ ...values });
    if (setParametresLienRequete && parametresLienRequete) {
      setParametresLienRequete({
        ...parametresLienRequete,
        range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
      });
    }
  }

  return {
    dataState,
    paramsTableau,
    onSubmitFiltres
  };
}
