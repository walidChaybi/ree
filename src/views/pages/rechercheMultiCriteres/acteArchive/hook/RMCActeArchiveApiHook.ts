import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IParamsTableau, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { mappingCriteresRMCArchive } from "./RMCActeArchiveUtils";

export interface ICriteresRechercheActeArchive {
  valeurs: IRMCActeArchive;
  range?: string;
  // Ajout de l'identifiant de la fiche qui a demandé la rmc (lors d'une navigation qui nécessite le rappel de la rmc pour obtenir les actes suivants ou précédents)
  ficheIdentifiant?: string;
}

interface IRMCActeArchiveApiHookResultat {
  dataRMCActe: ResultatRMCActe[];
  dataTableauRMCActe?: IParamsTableau;
  ficheIdentifiant?: string;
}

export function useRMCActeArchiveApiHook(criteres?: ICriteresRechercheActeArchive): IRMCActeArchiveApiHookResultat | null {
  const [resultat, setResultat] = useState<IRMCActeArchiveApiHookResultat | null>(null);
  const { appelApi: rmcActe } = useFetchApi(CONFIG_POST_RMC_ACTE);

  useEffect(() => {
    if (!criteres?.valeurs) return;

    const criteresRMC = mappingCriteresRMCArchive(criteres.valeurs);

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
      },
      apresErreur: e => {
        console.error("Erreur lors de la RMC acte :", e);
        messageManager.showError("Une erreur est survenue lors de la recherche multi-critères d'actes");
        logError({
          messageUtilisateur: "Impossible de récupérer les actes de la recherche multi-critères"
        });
      }
    });
  }, [criteres]);

  return resultat;
}
