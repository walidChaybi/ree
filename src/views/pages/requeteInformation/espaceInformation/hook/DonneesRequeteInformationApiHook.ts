import {
  getRequetesInformation,
  IQueryParametersPourRequetes,
  postRequetesInformation,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  IRequeteTableauInformation,
  mappingRequetesTableauInformation
} from "@model/requete/IRequeteTableauInformation";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export const useRequeteInformationApi = (
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void
) => {
  const [dataState, setDataState] = useState<IRequeteTableauInformation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});

  useEffect(() => {
    const listeStatuts = queryParameters?.statuts?.join(",");
    const estTypeRequeteInfoService =
      typeRequete === TypeAppelRequete.REQUETE_INFO_SERVICE;
    const callRequetesInfo = async (): Promise<any> => {
      return estTypeRequeteInfoService
        ? await postRequetesInformation(
            queryParameters.statuts,
            queryParameters
          )
        : await getRequetesInformation(listeStatuts, queryParameters);
    };

    callRequetesInfo()
      .then(result => {
        const mesRequetes = mappingRequetesTableauInformation(
          result?.body?.data,
          false
        );
        setDataState(mesRequetes);
        setParamsTableau(getParamsTableau(result));
        setEnChargement(false);
      })
      .catch(error => {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes d'information",
          error
        });
      });
  }, [queryParameters, typeRequete, setEnChargement]);

  return {
    dataState,
    paramsTableau
  };
};
