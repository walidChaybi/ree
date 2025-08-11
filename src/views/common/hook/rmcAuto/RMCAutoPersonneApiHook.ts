import { rechercheMultiCriteresPersonne } from "@api/appels/etatcivilApi";
import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { concatValeursRMCAutoPersonneRequest, mappingRMCPersonneResultat } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { useCacheLocalPage } from "@util/cacheLocalPageHook/CacheLocalPageHook";
import { useEffect } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IRMCAutoPersonneParams {
  valeurs: IRMCAutoPersonneRequest;
  range?: string;
}

export function useRMCAutoPersonneApiAvecCacheHook(params?: IRMCAutoPersonneParams): IRMCPersonneResultat[] | undefined {
  const { cacheLocalPage } = useCacheLocalPage<IRMCAutoPersonneRequest, IRMCPersonneResultat[]>(concatValeursRMCAutoPersonneRequest);

  useEffect(() => {
    if (params) {
      const resultatEnCache = cacheLocalPage.get(params.valeurs);
      if (!resultatEnCache) {
        rechercheMultiCriteresPersonne(params.valeurs, params?.range)
          .then((result: any) => {
            const resultatAvecMapping = mappingRMCPersonneResultat(result?.body?.data);
            cacheLocalPage.set(params.valeurs, resultatAvecMapping);
          })
          .catch((erreurs: any) => {
            /* istanbul ignore next */
            AfficherMessage.erreur("Impossible de récupérer les personnes de la recherche multi-critères.", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : []
            });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return cacheLocalPage.get(params?.valeurs);
}
