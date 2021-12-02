import { useEffect, useState } from "react";
import {
  IQueryParametersAssigneRequetes,
  patchUtilisateurAssigneRequeteV2
} from "../../../../../../api/appels/requeteApi";
import { IDataTable } from "../../../../../../model/requete/IDataTable";
import { logError } from "../../../../../common/util/LogManager";
import { getLibelle, getText } from "../../../../../common/widget/Text";

export function useUtilisateurRequeteApi(
  queryParameters?: IQueryParametersAssigneRequetes,
  requetes?: IDataTable[]
) {
  const [dataState, setDataState] = useState<IQueryParametersAssigneRequetes>();
  const [sucessState, setSuccessState] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (queryParameters !== undefined) {
      setSuccessState(undefined);

      patchUtilisateurAssigneRequeteV2(queryParameters)
        .then(() => {
          if (requetes !== undefined) {
            const idxRequete = requetes.findIndex(
              r => r.reponse?.idReponse === queryParameters.idReponse
            );

            requetes[
              idxRequete
            ].nomOec = `${queryParameters.prenomOec} ${queryParameters.nomOec}`;

            setSuccessState(
              `${getLibelle("Requête n°")}${
                requetes[idxRequete].idSagaDila
              } ${getText("modifiée avec succès")}`
            );
          }

          setDataState(queryParameters);
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible d'assigner un nouvel utilisateur à cette requête",
            error
          });
        });
    }
  }, [queryParameters, requetes]);

  return {
    dataState,
    sucessState
  };
}
