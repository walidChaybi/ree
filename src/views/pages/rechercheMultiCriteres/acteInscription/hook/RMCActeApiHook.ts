import { rechercheMultiCriteresActes } from "@api/appels/etatcivilApi";
import { getParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import {
  IRMCActeApiHookResultat,
  RESULTAT_NON_DEFINIT
} from "../../common/hook/RMCActeEtActeArchiveHookUtil";
import { mappingActes } from "../../common/mapping/RMCMappingUtil";
import {
  ICriteresRechercheActeInscription,
  mappingCriteres,
  rechercherActeAutorise
} from "./RMCActeInscriptionUtils";

export function useRMCActeApiHook(
  criteres?: ICriteresRechercheActeInscription
): IRMCActeApiHookResultat {
  const [resultat, setResultat] =
    useState<IRMCActeApiHookResultat>(RESULTAT_NON_DEFINIT);

  useEffect(() => {
    if (criteres && criteres.valeurs) {
      const criteresRequest = mappingCriteres(criteres.valeurs);

      if (rechercherActeAutorise(criteresRequest)) {
        rechercheMultiCriteresActes(criteresRequest, criteres.range)
          .then((result: any) => {
            setResultat({
              dataRMCActe: mappingActes(result.body.data.registres),
              dataTableauRMCActe: getParamsTableau(result),
              // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
              //  de la fiche acte pour sa pagination/navigation
              ficheIdentifiant: criteres.ficheIdentifiant
            });
          })
          .catch(error => {
            logError({
              messageUtilisateur:
                "Impossible de récupérer les actes de la recherche multi-critères",
              error
            });
            if (criteres?.onErreur) {
              criteres.onErreur();
            }
          });
      } else {
        setResultat({
          dataRMCActe: [],
          dataTableauRMCActe: {}
        });
      }
    }
  }, [criteres]);

  return resultat;
}
