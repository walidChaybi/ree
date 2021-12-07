import { useEffect, useState } from "react";
import { rechercheMultiCriteresAutoActes } from "../../../../../api/appels/etatcivilApi";
import { TRequete } from "../../../../../model/requete/IRequete";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingActes } from "../../common/mapping/RMCMappingUtil";
import { determinerCriteresRMCAuto } from "./RMCAutoActesInscriptionsUtils";

export function useRMCAutoActeApiHook(
  requete?: IRequeteTableauDelivrance | TRequete,
  range?: string
) {
  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<IResultatRMCActe[]>();
  const [
    dataTableauRMCAutoActe,
    setDataTableauRMCAutoActe
  ] = useState<IParamsTableau>();

  useEffect(() => {
    if (requete) {
      const criteresRequest = determinerCriteresRMCAuto(requete);

      rechercheMultiCriteresAutoActes(criteresRequest, range)
        .then((result: any) => {
          setDataRMCAutoActe(mappingActes(result.body.data.registres));
          setDataTableauRMCAutoActe(getParamsTableau(result));
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les actes de la recherche multi-critères automatique",
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
