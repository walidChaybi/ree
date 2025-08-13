import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IParamsTableau, getParamsTableauRMCDepuisHeaders } from "@util/GestionDesLiensApi";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../utils/AfficherMessage";
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
          dataTableauRMCActe: getParamsTableauRMCDepuisHeaders(headers),
          // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
          //  de la fiche acte pour sa pagination/navigation
          ficheIdentifiant: criteres.ficheIdentifiant
        });
      },
      apresErreur: (erreurs, statut) => {
        console.error("Erreur lors de la RMC acte :", erreurs);
        statut === 413
          ? AfficherMessage.info("La recherche renvoie plus de 100 résultats. Veuillez affiner votre recherche.", { fermetureAuto: true })
          : AfficherMessage.erreur("Une erreur est survenue lors de la recherche multi-critères d'actes", { erreurs });
      }
    });
  }, [criteres]);

  return resultat;
}
