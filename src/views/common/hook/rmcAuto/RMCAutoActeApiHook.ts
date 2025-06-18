import { rechercheMultiCriteresAutoActes } from "@api/appels/etatcivilApi";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mappingActes } from "../rmcActeInscription/mapping/RMCMappingUtil";
import { getCriteresRMCAuto } from "./RMCAutoActesInscriptionsUtils";

export interface IRMCAutoActeParams {
  requete?: IRequeteTableauDelivrance | TRequete;
  range?: string;
}

export function useRMCAutoActeApiHook({ requete, range }: IRMCAutoActeParams) {
  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<IResultatRMCActe[]>();
  const [dataTableauRMCAutoActe, setDataTableauRMCAutoActe] = useState<IParamsTableau>();

  useEffect(() => {
    if (requete) {
      const criteresRequest = getCriteresRMCAuto(requete);

      rechercheMultiCriteresAutoActes(criteresRequest, range)
        .then((result: any) => {
          setDataRMCAutoActe(mappingActes(result.body.data.registres));
          setDataTableauRMCAutoActe(getParamsTableauDepuisReponseApi(result));
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Impossible de récupérer les actes de la recherche multi-critères automatique",
            error
          });
        });
    }
  }, [requete, range]);

  return {
    dataRMCAutoActe,
    dataTableauRMCAutoActe
  };
}
