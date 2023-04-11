import { rechercheMultiCriteresPersonne } from "@api/appels/etatcivilApi";
import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import {
  concatValeursRMCAutoPersonneRequest,
  mappingRMCPersonneResultat
} from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { useCacheLocalPage } from "@util/cacheLocalPageHook/CacheLocalPageHook";
import { logError } from "@util/LogManager";
import { useEffect } from "react";

export interface IRMCAutoPersonneParams {
  valeurs: IRMCAutoPersonneRequest;
  range?: string;
}

export function useRMCAutoPersonneApiAvecCacheHook(
  params?: IRMCAutoPersonneParams
): IRMCPersonneResultat[] | undefined {
  const { cacheLocalPage } = useCacheLocalPage<
    IRMCAutoPersonneRequest,
    IRMCPersonneResultat[]
  >(concatValeursRMCAutoPersonneRequest);

  useEffect(() => {
    if (params) {
      const resultatEnCache = cacheLocalPage.get(params.valeurs);
      if (!resultatEnCache) {
        rechercheMultiCriteresPersonne(params.valeurs, params?.range)
          .then((result: any) => {
            const resultatAvecMapping = mappingRMCPersonneResultat(
              result?.body?.data
            );
            cacheLocalPage.set(params.valeurs, resultatAvecMapping);
          })
          .catch((error: any) => {
            /* istanbul ignore next */
            logError({
              messageUtilisateur:
                "Impossible de récupérer les personnes de la recherche multi-critères.",
              error
            });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return cacheLocalPage.get(params?.valeurs);
}
