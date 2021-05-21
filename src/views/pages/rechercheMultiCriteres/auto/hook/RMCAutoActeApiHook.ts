import { useEffect, useState } from "react";
import { rechercheMultiCriteresAutoActes } from "../../../../../api/appels/etatcivilApi";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingActes } from "../../acteInscription/hook/RMCActeInscriptionUtils";
import { determinerCriteresRMCAuto } from "./RMCAutoUtils";

export function useRMCAutoActeApiHook(
  idRequete: string,
  data: IRequeteTableau[],
  range: string
) {
  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<IResultatRMCActe[]>();
  const [
    dataTableauRMCAutoActe,
    setDataTableauRMCAutoActe
  ] = useState<IParamsTableau>();

  useEffect(() => {
    if (idRequete != null && data != null) {
      const criteresRequest = determinerCriteresRMCAuto(idRequete, data);

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
  }, [idRequete, data, range]);

  return {
    dataRMCAutoActe,
    dataTableauRMCAutoActe
  };
}
