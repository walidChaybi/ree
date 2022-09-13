import { rechercheMultiCriteresActes } from "@api/appels/etatcivilApi";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { getParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import {
  IRMCActeApiHookResultat,
  RESULTAT_NON_DEFINIT
} from "../../common/hook/RMCActeEtActeArchiveHookUtil";
import { mappingActes } from "../../common/mapping/RMCMappingUtil";
import { mappingCriteres } from "./RMCActeArchiveUtils";

export interface ICriteresRechercheActeArchive {
  valeurs: IRMCActeArchive;
  range?: string;
  // Ajout de l'identifiant de la fiche qui a demandé la rmc (lors d'une navigation qui nécessite le rappel de la rmc pour obtenir les actes suivants ou précédents)
  ficheIdentifiant?: string;
}

export function useRMCActeArchiveApiHook(
  criteres?: ICriteresRechercheActeArchive
) {
  const [resultat, setResultat] =
    useState<IRMCActeApiHookResultat>(RESULTAT_NON_DEFINIT);
  useEffect(() => {
    if (criteres && criteres.valeurs) {
      const criteresRequest = mappingCriteres(criteres.valeurs);

      rechercheMultiCriteresActes(criteresRequest, criteres.range)
        .then((result: any) => {
          setResultat({
            dataRMCActe: mappingActes(result.body.data.registres),
            dataTableauRMCActe: getParamsTableau(result),
            // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
            //  (datasFiches) de la fiche acte pour sa pagination/navigation
            ficheIdentifiant: criteres.ficheIdentifiant
          });
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les actes de la recherche multi-critères",
            error
          });
        });
    }
  }, [criteres]);

  return resultat;
}
