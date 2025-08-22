import { getRequetesInformation, IQueryParametersPourRequetes, postRequetesInformation, TypeAppelRequete } from "@api/appels/requeteApi";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { IRequeteTableauInformation, mappingRequetesTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { VALEUR_FILTRE_INFORMATION_DEFAUT } from "@pages/requeteInformation/commun/FiltresServiceRequeteInformationForm/FiltresServiceRequeteInformationForm";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

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
      .catch(erreurs => {
        AfficherMessage.erreur("Impossible de récupérer les requêtes d'information", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : []
        });
      });
  }, [queryParameters, typeRequete, filtresRequetes, peutChercher]);

  return {
    dataState,
    paramsTableau
  };
};
