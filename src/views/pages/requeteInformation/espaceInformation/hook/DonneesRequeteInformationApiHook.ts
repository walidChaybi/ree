import { IQueryParametersPourRequetes, postRequetesInformation, TypeAppelRequete } from "@api/appels/requeteApi";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { IRequeteTableauInformation, mappingRequetesTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { VALEUR_FILTRE_INFORMATION_DEFAUT } from "../../commun/FiltresServiceRequeteInformationForm/FiltresServiceRequeteInformationForm";

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
    if (!peutChercher) return;

    postRequetesInformation(queryParameters, filtresRequetes || VALEUR_FILTRE_INFORMATION_DEFAUT)
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
