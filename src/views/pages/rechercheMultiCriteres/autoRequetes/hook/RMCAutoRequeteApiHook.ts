import { useEffect, useState } from "react";
import { rechercheMultiCriteresAutoRequetes } from "../../../../../api/appels/requeteApi";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import {
  IRequeteTableau,
  mappingRequetesTableau
} from "../../../../../model/requete/v2/IRequeteTableau";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { determinerCriteresRMCAuto } from "./RMCAutoRequetesUtils";

export function useRMCAutoRequeteApiHook(requete: TRequete, range: string) {
  const [dataRMCAutoRequete, setDataRMCAutoRequete] = useState<
    IRequeteTableau[]
  >();

  const [
    dataTableauRMCAutoRequete,
    setDataTableauRMCAutoRequete
  ] = useState<IParamsTableau>();

  useEffect(() => {
    async function fetchRequetes() {
      try {
        if (requete != null) {
          const criteresRequest = determinerCriteresRMCAuto(requete);
          const result = await rechercheMultiCriteresAutoRequetes(
            criteresRequest,
            range
          );
          const requetes = mappingRequetesTableau(
            result?.body?.data?.resultatsRecherche,
            true
          );
          setDataRMCAutoRequete(requetes);
          setDataTableauRMCAutoRequete(getParamsTableau(result));
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes de la recherche multi-critères automatique",
          error
        });
      }
    }
    fetchRequetes();
  }, [requete, range]);

  return {
    dataRMCAutoRequete,
    dataTableauRMCAutoRequete
  };
}
