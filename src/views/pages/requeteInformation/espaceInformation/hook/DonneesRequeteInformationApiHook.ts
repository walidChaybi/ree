import { getRequetesInformation, IQueryParametersPourRequetes, postRequetesInformation, TypeAppelRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { IRequeteTableauInformation, mappingRequetesTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { VALEUR_FILTRE_INFORMATION_DEFAUT } from "@pages/requeteInformation/commun/FiltresServiceRequeteInformationForm/FiltresServiceRequeteInformationForm";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useContext, useEffect, useState } from "react";

export const useRequeteInformationApi = (
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete,
  filtresRequetes?: IFiltresServiceRequeteInformationFormValues,
  peutChercher?: boolean
) => {
  const [dataState, setDataState] = useState<IRequeteTableauInformation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const { utilisateurs, services } = useContext(RECEContextData);
  useEffect(() => {
    const estTypeRequeteInfoService = typeRequete === TypeAppelRequete.REQUETE_INFO_SERVICE;

    if (estTypeRequeteInfoService && !peutChercher) {
      return;
    }

    const callRequetesInfo = async (): Promise<any> => {
      return estTypeRequeteInfoService
        ? await postRequetesInformation(queryParameters, filtresRequetes || VALEUR_FILTRE_INFORMATION_DEFAUT)
        : await getRequetesInformation(queryParameters);
    };

    callRequetesInfo()
      .then(result => {
        const mesRequetes = mappingRequetesTableauInformation(result?.body?.data, false, utilisateurs, services);
        setDataState(mesRequetes);
        setParamsTableau(getParamsTableauDepuisReponseApi(result));
      })
      .catch(error => {
        logError({
          messageUtilisateur: "Impossible de récupérer les requêtes d'information",
          error
        });
      });
  }, [queryParameters, typeRequete, filtresRequetes, peutChercher]);

  return {
    dataState,
    paramsTableau
  };
};
