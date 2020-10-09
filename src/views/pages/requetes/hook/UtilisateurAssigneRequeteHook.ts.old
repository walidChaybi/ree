import { useState, useEffect } from "react";
import { IDataTable } from "../MesRequetesDelivrancePage";
import { getText } from "../../../common/widget/Text";
import {
  patchUtilisateurAssigneRequete,
  IQueryParametersAssigneRequetes
} from "../../../../api/appels/requeteApi";

export function useUtilisateurRequeteApi(
  queryParameters?: IQueryParametersAssigneRequetes,
  requetes?: IDataTable[]
) {
  const [dataState, setDataState] = useState<IQueryParametersAssigneRequetes>();
  const [errorState, setErrorState] = useState(undefined);
  const [sucessState, setSuccessState] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (queryParameters !== undefined) {
      setSuccessState(undefined);

      patchUtilisateurAssigneRequete(queryParameters)
        .then(() => {
          if (requetes !== undefined) {
            const idxRequete = requetes.findIndex(
              (r) => r.reponse?.idReponse === queryParameters.idReponse
            );

            requetes[
              idxRequete
            ].nomOec = `${queryParameters.prenomOec} ${queryParameters.nomOec}`;

            setSuccessState(
              `${getText("success.pages.requetes.assigneDebut")}${
                requetes[idxRequete].idSagaDila
              } ${getText("success.pages.requetes.assigneFin")}`
            );
          }

          setDataState(queryParameters);
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters, requetes]);

  return {
    dataState,
    errorState,
    sucessState
  };
}
