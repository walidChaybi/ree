import { useEffect, useState } from "react";
import { rechercheMultiCriteresAutoInscription } from "../../../../../api/appels/etatcivilApi";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingInscriptions } from "../../acteInscription/hook/RMCActeInscriptionUtils";
import { determinerCriteresRMCAuto } from "./RMCAutoActesInscriptionsUtils";

export function useRMCAutoInscriptionApiHook(
  requete?: IRequeteTableau | TRequete,
  data?: IRequeteTableau[],
  range?: string
) {
  const [dataRMCAutoInscription, setDataRMCAutoInscription] = useState<
    IResultatRMCInscription[]
  >();

  const [
    dataTableauRMCAutoInscription,
    setDataTableauRMCAutoInscription
  ] = useState<IParamsTableau>();

  useEffect(() => {
    async function fetchInscriptions() {
      try {
        if (requete) {
          const criteresRequest = determinerCriteresRMCAuto(requete);
          const result = await rechercheMultiCriteresAutoInscription(
            criteresRequest,
            range
          );
          const inscriptions = mappingInscriptions(
            result?.body?.data?.repertoiresCiviles
          );
          setDataRMCAutoInscription(inscriptions);
          setDataTableauRMCAutoInscription(getParamsTableau(result));
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les inscriptions de la recherche multi-critères automatique",
          error
        });
      }
    }
    fetchInscriptions();
  }, [requete, data, range]);

  return {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  };
}
