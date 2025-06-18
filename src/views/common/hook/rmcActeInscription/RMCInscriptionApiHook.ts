import { rechercheMultiCriteresInscriptions } from "@api/appels/etatcivilApi";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { execute, getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";
import {
  ICriteresRechercheActeInscription,
  mappingCriteres,
  mappingInscriptions,
  rechercherRepertoireAutorise
} from "./RMCActeInscriptionUtils";

export interface IRMCInscriptionApiHookResultat {
  dataRMCInscription?: IResultatRMCInscription[];
  dataTableauRMCInscription?: IParamsTableau;
  ficheIdentifiant?: string;
  errors?: any[];
}

const RESULTAT_NON_DEFINIT: IRMCInscriptionApiHookResultat = {};

export function useRMCInscriptionApiHook(criteres?: ICriteresRechercheActeInscription): IRMCInscriptionApiHookResultat {
  const [resultat, setResultat] = useState<IRMCInscriptionApiHookResultat>(RESULTAT_NON_DEFINIT);

  useEffect(() => {
    async function fetchInscriptions() {
      try {
        if (criteres != null && criteres.valeurs != null) {
          const criteresRecherche = mappingCriteres(criteres.valeurs);
          if (rechercherRepertoireAutorise(criteresRecherche)) {
            const result = await rechercheMultiCriteresInscriptions(criteresRecherche, criteres.range);
            const inscriptions = mappingInscriptions(result?.body?.data?.repertoiresCiviles);
            setResultat({
              dataRMCInscription: inscriptions,
              dataTableauRMCInscription: getParamsTableauDepuisReponseApi(result),
              // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
              //  de la fiche Inscription pour sa pagination/navigation
              ficheIdentifiant: criteres.ficheIdentifiant,
              errors: result?.body?.errors
            });
            execute(criteres.onFinTraitement);
          } else {
            setResultat({
              dataRMCInscription: [],
              dataTableauRMCInscription: {}
            });
          }
        }
      } catch (error) {
        logError({
          messageUtilisateur: "Impossible de récupérer les inscriptions de la recherche multi-critères",
          error
        });
        execute(criteres?.onErreur);
      }
    }
    fetchInscriptions();
  }, [criteres]);

  useEffect(() => {
    if (resultat.errors) {
      resultat.errors.forEach(e => messageManager.showInfoAndClose(getLibelle(e.message)));
    }
  }, [resultat.errors]);

  return resultat;
}
