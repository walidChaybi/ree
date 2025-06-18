import { rechercheMultiCriteresActes } from "@api/appels/etatcivilApi";
import { getParamsTableauDepuisReponseApi } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { useEffect, useState } from "react";
import { IRMCActeApiHookResultat, RESULTAT_NON_DEFINIT } from "./RMCActeEtActeArchiveHookUtil";
import { ICriteresRechercheActeInscription, mappingCriteres, rechercherActeAutorise } from "./RMCActeInscriptionUtils";
import { mappingActes } from "./mapping/RMCMappingUtil";

export function useRMCActeApiHook(criteres?: ICriteresRechercheActeInscription): IRMCActeApiHookResultat {
  const [resultat, setResultat] = useState<IRMCActeApiHookResultat>(RESULTAT_NON_DEFINIT);

  useEffect(() => {
    if (criteres?.valeurs) {
      const criteresRequest = mappingCriteres(criteres.valeurs);

      if (rechercherActeAutorise(criteresRequest)) {
        rechercheMultiCriteresActes(criteresRequest, criteres.range)
          .then((result: any) => {
            setResultat({
              dataRMCActe: mappingActes(result.body.data.registres),
              dataTableauRMCActe: getParamsTableauDepuisReponseApi(result),
              // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
              //  de la fiche acte pour sa pagination/navigation
              ficheIdentifiant: criteres.ficheIdentifiant,
              errors: result.body.errors
            });
            criteres.onFinTraitement?.();
          })
          .catch(error => {
            logError({
              messageUtilisateur: "Impossible de récupérer les actes de la recherche multi-critères",
              error
            });
            criteres?.onErreur?.();
          });
      } else {
        setResultat({
          dataRMCActe: [],
          dataTableauRMCActe: {}
        });
      }
    }
  }, [criteres]);

  useEffect(() => {
    if (resultat.errors) {
      resultat.errors.forEach(e => messageManager.showInfoAndClose(e.message ?? ""));
    }
  }, [resultat.errors]);

  return resultat;
}
