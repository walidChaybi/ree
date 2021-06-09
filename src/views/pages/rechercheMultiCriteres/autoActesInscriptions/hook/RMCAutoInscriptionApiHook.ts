import { useEffect, useState } from "react";
import { rechercheMultiCriteresAutoInscription } from "../../../../../api/appels/etatcivilApi";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingInscriptions } from "../../acteInscription/hook/RMCActeInscriptionUtils";
import { determinerCriteresRMCAuto } from "./RMCAutoUtils";

export function useRMCAutoInscriptionApiHook(
  idRequete: string,
  data: IRequeteTableau[],
  range: string
) {
  const [dataRMCAutoInscription, setDataRMCAutoInscription] = useState<
    IResultatRMCInscription[]
  >();

  const [
    dataTableauRMCAutoInscription,
    setDataTableauRMCAutoInscription
  ] = useState<IParamsTableau>();

  useEffect(() => {
    if (idRequete != null && data != null) {
      const criteresRequest = determinerCriteresRMCAuto(idRequete, data);

      rechercheMultiCriteresAutoInscription(criteresRequest, range)
        .then((result: any) => {
          setDataRMCAutoInscription(
            mappingInscriptions(result.body.data.repertoiresCiviles)
          );
          setDataTableauRMCAutoInscription(getParamsTableau(result));
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les inscriptions de la recherche multi-critères automatique",
            error
          });
        });
    }
  }, [idRequete, data, range]);

  return {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  };
}
