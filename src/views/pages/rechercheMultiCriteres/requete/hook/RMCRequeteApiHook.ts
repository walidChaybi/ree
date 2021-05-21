import { useEffect, useState } from "react";
import { rechercheMultiCriteresRequetes } from "../../../../../api/appels/requeteApi";
import {
  IRequeteTableau,
  mappingRequetesTableau
} from "../../../../../model/requete/v2/IRequeteTableau";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingCriteresRequete } from "./RMCRequeteMapping";

export function useRMCRequeteApiHook(criteres?: ICriteresRMCRequete) {
  const [dataRMCRequete, setDataRMCRequete] = useState<IRequeteTableau[]>();
  const [
    dataTableauRMCRequete,
    setDataTableauRMCRequete
  ] = useState<IParamsTableau>();

  useEffect(() => {
    if (criteres != null && criteres.valeurs != null) {
      const criteresRequest = mappingCriteresRequete(criteres.valeurs);

      rechercheMultiCriteresRequetes(criteresRequest, criteres.range)
        .then((result: any) => {
          setDataRMCRequete(
            mappingRequetesTableau(result.body.data.resultatsRecherche, true)
          );
          setDataTableauRMCRequete(getParamsTableau(result));
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les requetes de la recherche multi-critères",
            error
          });
        });
    }
  }, [criteres]);

  return {
    dataRMCRequete,
    dataTableauRMCRequete
  };
}
