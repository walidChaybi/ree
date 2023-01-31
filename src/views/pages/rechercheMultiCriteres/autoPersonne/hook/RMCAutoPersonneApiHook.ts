import { rechercheMultiCriteresPersonne } from "@api/appels/etatcivilApi";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { IRMCAutoPersonneResultat } from "../../../../../model/rmc/personne/IRMCAutoPersonneResultat";
import { mappingPersonnesTableau } from "../../common/mapping/RMCMappingUtil";
import { HTTP_PAYLOAD_TOO_LARGE } from "./../../../../../api/ApiManager";
import { IRequeteCreationTranscription } from "./../../../../../model/requete/IRequeteCreationTranscription";
import { mapRequeteVersRMCAutoPersonneParams } from "./RMCAutoPersonneUtils";

export interface IRMCAutoPersonneParams {
  valeurs: IRMCAutoPersonneRequest;
  range?: string;
}

export function useRMCAutoPersonneApiHook(
  requete?: IRequeteCreationTranscription
) {
  const [resultatRMCAutoPersonne, setResultatRMCAutoPersonne] = useState<
    IRMCAutoPersonneResultat[]
  >([]);

  useEffect(() => {
    if (requete) {
      const criteres = mapRequeteVersRMCAutoPersonneParams(requete);
      rechercheMultiCriteresPersonne(criteres.valeurs, criteres?.range)
        .then((result: any) => {
          setResultatRMCAutoPersonne(
            mappingPersonnesTableau(result?.body?.data)
          );
        })
        .catch((error: any) => {
          /* istanbul ignore if */
          if (error.status === HTTP_PAYLOAD_TOO_LARGE) {
            logError({
              messageUtilisateur:
                "La recherche ramène trop de résultats. Veuillez affiner votre recherche.",
              error
            });
          } else {
            logError({
              messageUtilisateur:
                "Impossible de récupérer les personnes de la recherche multi-critères.",
              error
            });
          }
        });
    }
  }, [requete]);

  return { resultatRMCAutoPersonne };
}
