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
import { IRequeteTableauDelivrance, mappingRequetesTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export function useRequeteDelivranceApiHook(
  parametresLienRequete: IQueryParametersPourRequetes | undefined,
  typeRequete: TypeAppelRequete,
  setParametresLienRequete?: React.Dispatch<React.SetStateAction<IQueryParametersPourRequetes | undefined>>
) {
  const { utilisateurs, services } = useContext(RECEContextData);
  const [dataState, setDataState] = useState<IRequeteTableauDelivrance[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const [filtresReq, setFiltresReq] = useState<IFiltreServiceRequeteDelivranceFormValues>({} as IFiltreServiceRequeteDelivranceFormValues);

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        if (parametresLienRequete) {
          const listeStatuts = parametresLienRequete?.statuts?.join(",");
          const result =
            typeRequete === TypeAppelRequete.MES_REQUETES_DELIVRANCE
              ? await getTableauRequetesDelivrance(typeRequete, listeStatuts, parametresLienRequete)
              : await postTableauRequetesDelivranceService(
                  parametresLienRequete,
                  mappingFiltreServiceRequeteDelivranceVersFiltreDto(filtresReq)
                );
          const mesRequetes = mappingRequetesTableauDelivrance(result?.body?.data, false, utilisateurs, services);
          setDataState(mesRequetes);
          setParamsTableau(getParamsTableauDepuisReponseApi(result));
        }
      } catch (erreurs) {
        AfficherMessage.erreur("Impossible de récupérer les requêtes de délivrance", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : []
        });
      }
    }
    fetchMesRequetes();
  }, [parametresLienRequete, typeRequete, filtresReq]);

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
