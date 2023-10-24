import {
  getReqNataliById,
  getRequetesCreation,
  IQueryParametersPourRequetes,
  postRequetesServiceCreation,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  IFiltreServiceRequeteCreationFormValues,
  IFiltresServiceRequeteCreation,
  mappingFiltreServiceCreationVersFiltreDto
} from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import {
  IRequeteTableauCreation,
  mappingUneRequeteTableauCreation
} from "@model/requete/IRequeteTableauCreation";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useRequeteCreationApiHook(
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void,
  queryParameters?: IQueryParametersPourRequetes
) {
  const [dataState, setDataState] = useState<IRequeteTableauCreation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const [numeroReqNatali, setNumeroReqNatali] = useState<string>();
  const [filtresReq, setFiltresReq] = useState<IFiltresServiceRequeteCreation>(
    {} as IFiltresServiceRequeteCreation
  );

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        if (queryParameters) {
          const listeStatuts = queryParameters.statuts?.join(",");
          const result =
            typeRequete === TypeAppelRequete.MES_REQUETES_CREATION
              ? await getRequetesCreation(listeStatuts, queryParameters)
              : await postRequetesServiceCreation(
                  queryParameters,
                  mappingFiltreServiceCreationVersFiltreDto(filtresReq)
                );
          const mesRequetes = mappingRequetesTableauCreation(
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
            "Impossible de récupérer les requêtes de création",
          error
        });
      }
    }
    fetchMesRequetes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParameters, typeRequete, setEnChargement, filtresReq]);

  useEffect(() => {
    if (numeroReqNatali) {
      getReqNataliById(numeroReqNatali)
        .then(res => {
          if (res) {
            setDataState(mappingRequetesTableauCreation(res.body.data, false));
            setParamsTableau(getParamsTableau(res));
          }
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: `Impossible de récupérer la requête Natali associée au dossier ${numeroReqNatali}`,
            error
          });
        });
    }
  }, [numeroReqNatali]);

  function onSubmit(values: IFiltreServiceRequeteCreationFormValues) {
    setNumeroReqNatali(values.numeroRequete);
    if (!values.numeroRequete) {
      setFiltresReq({ ...values });
    }
  }

  return {
    dataState,
    paramsTableau,
    onSubmit
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
