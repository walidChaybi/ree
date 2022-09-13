import { rechercheMultiCriteresRequetes } from "@api/appels/requeteApi";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { mappingRequetesTableau } from "@util/RequetesUtils";
import { useEffect, useState } from "react";
import { mappingCriteresRequete } from "./RMCRequeteMapping";

export function useRMCRequeteApiHook(criteres?: ICriteresRMCRequete) {
  const [dataRMCRequete, setDataRMCRequete] = useState<TRequeteTableau[]>();
  const [dataTableauRMCRequete, setDataTableauRMCRequete] =
    useState<IParamsTableau>();

  useEffect(() => {
    async function fetchRequetes() {
      try {
        if (criteres != null && criteres.valeurs != null) {
          const criteresRequest = mappingCriteresRequete(criteres.valeurs);
          const result = await rechercheMultiCriteresRequetes(
            criteresRequest,
            criteres.range
          );
          const requetes = mappingRequetesTableau(
            result?.body?.data?.resultatsRecherche,
            true
          );
          setDataRMCRequete(requetes);
          setDataTableauRMCRequete(getParamsTableau(result));
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requetes de la recherche multi-critères",
          error
        });
      }
    }
    fetchRequetes();
  }, [criteres]);

  return {
    dataRMCRequete,
    dataTableauRMCRequete
  };
}
