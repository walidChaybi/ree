import { useState, useEffect } from "react";
import { rechercheMultiCriteresRequetes } from "../../../../../api/appels/requeteApi";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IResultatRMCRequete } from "../../../../../model/rmc/requete/IResultatRMCRequete";
import {
  getDataTableau,
  IDataTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingCriteresRequete, mappingRequetes } from "./RMCRequeteUtils";

export function useRMCRequeteApiHook(criteres?: ICriteresRMCRequete) {
  const [dataRMCRequete, setDataRMCRequete] = useState<IResultatRMCRequete[]>();
  const [
    dataTableauRMCRequete,
    setDataTableauRMCRequete
  ] = useState<IDataTableau>();

  useEffect(() => {
    if (criteres != null && criteres.valeurs != null) {
      const criteresRequest = mappingCriteresRequete(criteres.valeurs);

      rechercheMultiCriteresRequetes(criteresRequest, criteres.range)
        .then((result: any) => {
          setDataRMCRequete(
            mappingRequetes(result.body.data.resultatsRecherche)
          );
          setDataTableauRMCRequete(getDataTableau(result));
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
