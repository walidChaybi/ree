import { rechercheMultiCriteresPersonne } from "@api/appels/etatcivilApi";
import { mappingPersonnesTableau } from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import { concatValeursRMCAutoPersonneRequest } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { useCacheLocalPage } from "@util/cacheLocalPageHook/CacheLocalPageHook";
import { logError } from "@util/LogManager";
import { useEffect } from "react";

export interface IRMCAutoPersonneParams {
  valeurs: IRMCAutoPersonneRequest;
  range?: string;
}

export interface IRMCAutoPersonneResultat {
  idPersonne: string;
  nom: string;
  autresNoms: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  idDocument: string;
  nature: string;
  statut: string;
  reference: string;
  categorieRepertoire: string;
  statutOuType: string;
}

export function useRMCAutoPersonneApiAvecCacheHook(
  params?: IRMCAutoPersonneParams
): IRMCAutoPersonneResultat[] | undefined {
  const { cacheLocalPage } = useCacheLocalPage<
    IRMCAutoPersonneRequest,
    IRMCAutoPersonneResultat[]
  >(concatValeursRMCAutoPersonneRequest);

  useEffect(() => {
    if (params) {
      const resultatEnCache = cacheLocalPage.get(params.valeurs);
      if (!resultatEnCache) {
        rechercheMultiCriteresPersonne(params.valeurs, params?.range)
          .then((result: any) => {
            const resultatavecMapping = mappingPersonnesTableau(
              result?.body?.data
            );
            cacheLocalPage.set(params.valeurs, resultatavecMapping);
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
