import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { useEffect, useState } from "react";
import { IRMCActeApiHookResultat } from "../../views/common/hook/rmcActeInscription/RMCActeEtActeArchiveHookUtil";
import {
  ICriteresRechercheActeInscription,
  mappingCriteres,
  rmcActeAutorisee
} from "../../views/common/hook/rmcActeInscription/RMCActeInscriptionUtils";
import useFetchApi from "../api/FetchApiHook";

export const useRMCActeApiHook = (criteres?: ICriteresRechercheActeInscription): IRMCActeApiHookResultat | null => {
  const [resultat, setResultat] = useState<IRMCActeApiHookResultat | null>(null);
  const { appelApi: rmcActe } = useFetchApi(CONFIG_POST_RMC_ACTE);

  useEffect(() => {
    if (!criteres?.valeurs) return;

    const criteresRMC = mappingCriteres(criteres.valeurs);

    if (!rmcActeAutorisee(criteresRMC)) {
      setResultat({
        dataRMCActe: [],
        dataTableauRMCActe: PARAMS_TABLEAU_VIDE
      });
      return;
    }

    rmcActe({
      parametres: { query: { range: criteres.range }, body: criteresRMC },
      apresSucces: (actes, headers) => {
        setResultat({
          dataRMCActe: actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null),
          dataTableauRMCActe: getParamsTableauDepuisHeaders(headers),
          // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
          //  de la fiche acte pour sa pagination/navigation
          ficheIdentifiant: criteres.ficheIdentifiant
        });
        criteres.onFinTraitement?.();
      },
      apresErreur: e => {
        console.error("Erreur lors de la RMC acte :", e);
        messageManager.showError("Une erreur est survenue lors de la recherche multi-critères d'actes");
        logError({
          messageUtilisateur: "Impossible de récupérer les actes de la recherche multi-critères"
        });
        criteres?.onErreur?.();
      }
    });
  }, [criteres]);

  return resultat;
};
