import { rechercheMultiCriteresAutoRequetes } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TRequete } from "@model/requete/IRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { mappingRequetesTableau } from "@util/RequetesUtils";
import { useContext, useEffect, useState } from "react";
import { determinerCriteresRMCAuto } from "./RMCAutoRequetesUtils";

export function useRMCAutoRequeteApiHook(requete: TRequete, range: string) {
  const [dataRMCAutoRequete, setDataRMCAutoRequete] =
    useState<TRequeteTableau[]>();

  const [dataTableauRMCAutoRequete, setDataTableauRMCAutoRequete] =
    useState<IParamsTableau>();

  const { utilisateurs, services } = useContext(RECEContextData);

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
            true,
            utilisateurs,
            services
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
