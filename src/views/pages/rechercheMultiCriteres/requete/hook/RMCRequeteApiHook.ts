import { rechercheMultiCriteresRequetes } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { mappingRequetesTableau } from "@util/RequetesUtils";
import { useContext, useEffect, useState } from "react";
import { mappingCriteresRequete } from "./RMCRequeteMapping";

export function useRMCRequeteApiHook(criteresRMCRequete?: ICriteresRMCRequete) {
  const [dataRMCRequete, setDataRMCRequete] = useState<TRequeteTableau[]>();
  const [dataTableauRMCRequete, setDataTableauRMCRequete] = useState<IParamsTableau>();
  const { utilisateurs, services } = useContext(RECEContextData);

  useEffect(() => {
    if (criteresRMCRequete?.valeurs) {
      const criteres = mappingCriteresRequete(criteresRMCRequete.valeurs);
      rechercheMultiCriteresRequetes(criteres, criteresRMCRequete.range)
        .then((result: any) => {
          const requetes = mappingRequetesTableau(result?.body?.data?.resultatsRecherche, true, utilisateurs, services);
          setDataRMCRequete(requetes);
          setDataTableauRMCRequete(getParamsTableau(result));
        })
        .catch((error: any) => {
          /* istanbul ignore next */
          logError({
            messageUtilisateur: "Impossible de récupérer les requetes de la recherche multi-critères",
            error
          });
          criteresRMCRequete?.onErreur?.();
        });
    }
  }, [criteresRMCRequete]);

  return {
    dataRMCRequete,
    dataTableauRMCRequete
  };
}
