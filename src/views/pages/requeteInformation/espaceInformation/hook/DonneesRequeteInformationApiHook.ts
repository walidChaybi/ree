import {
  getRequetesInformation,
  IQueryParametersPourRequetes,
  postRequetesInformation,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import {
  IRequeteTableauInformation,
  mappingRequetesTableauInformation
} from "@model/requete/IRequeteTableauInformation";
import { VALEUR_FILTRE_INFORMATION_DEFAUT } from "@pages/requeteInformation/commun/FiltresServiceRequeteInformationForm/FiltresServiceRequeteInformationForm";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useContext, useEffect, useState } from "react";

export const useRequeteInformationApi = (
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void,
  filtresRequetes?: IFiltresServiceRequeteInformationFormValues,
  peutChercher?: boolean,
  setTableauDoitReset?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [dataState, setDataState] = useState<IRequeteTableauInformation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const { utilisateurs, services } = useContext(RECEContextData);
  useEffect(() => {
    const estTypeRequeteInfoService =
      typeRequete === TypeAppelRequete.REQUETE_INFO_SERVICE;

    if (estTypeRequeteInfoService && !peutChercher) {
      return;
    }

    const callRequetesInfo = async (): Promise<any> => {
      return estTypeRequeteInfoService
        ? await postRequetesInformation(
            queryParameters,
            filtresRequetes || VALEUR_FILTRE_INFORMATION_DEFAUT
          )
        : await getRequetesInformation(queryParameters);
    };

    callRequetesInfo()
      .then(result => {
        const mesRequetes = mappingRequetesTableauInformation(
          result?.body?.data,
          false,
          utilisateurs,
          services
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
      })
      .finally(() => {
        if (
          setTableauDoitReset &&
          estTypeRequeteInfoService &&
          filtresRequetes
        ) {
          setTableauDoitReset(true);
          setTableauDoitReset(false);
        }
      });
  }, [
    queryParameters,
    typeRequete,
    setEnChargement,
    filtresRequetes,
    peutChercher,
    setTableauDoitReset
  ]);

  return {
    dataState,
    paramsTableau
  };
};
