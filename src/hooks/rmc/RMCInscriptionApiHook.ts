import { CONFIG_POST_RMC_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCInscriptionConfigApi";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauRMCDepuisHeaders } from "@util/GestionDesLiensApi";
import { useEffect, useState } from "react";
import AfficherMessage from "../../utils/AfficherMessage";
import {
  ICriteresRechercheActeInscription,
  mappingCriteres,
  rmcInscriptionAutorisee
} from "../../views/common/hook/rmcActeInscription/RMCActeInscriptionUtils";
import useFetchApi from "../api/FetchApiHook";

interface IRMCInscriptionApiHookResultat {
  dataRMCInscription: TResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  ficheIdentifiant?: string;
}

export const useRMCInscriptionApiHook = (
  criteres?: ICriteresRechercheActeInscription
): { resultat: IRMCInscriptionApiHookResultat | null; rmcInscriptionEnCours: boolean } => {
  const [resultat, setResultat] = useState<IRMCInscriptionApiHookResultat | null>(null);

  const { appelApi: rechercheInscriptions, enAttenteDeReponseApi: rmcInscriptionEnCours } = useFetchApi(CONFIG_POST_RMC_INSCRIPTION);

  useEffect(() => {
    if (!criteres?.valeurs) return;

    const criteresRecherche = mappingCriteres(criteres.valeurs);

    if (!rmcInscriptionAutorisee(criteresRecherche)) {
      setResultat({
        dataRMCInscription: [],
        dataTableauRMCInscription: PARAMS_TABLEAU_VIDE
      });
      return;
    }

    rechercheInscriptions({
      parametres: { body: criteresRecherche, query: { range: criteres.range } },
      apresSucces: (inscriptions, headers) => {
        setResultat({
          dataRMCInscription: inscriptions
            .map(ResultatRMCInscription.depuisDto)
            .filter((inscription): inscription is TResultatRMCInscription => inscription !== null),
          dataTableauRMCInscription: getParamsTableauRMCDepuisHeaders(headers),
          // L'identifiant de la fiche qui a démandé la rmc doit être retourné dans la réponse car il est utilisé pour mettre à jour les actes
          //  de la fiche Inscription pour sa pagination/navigation
          ficheIdentifiant: criteres.ficheIdentifiant
        });
        criteres.onFinTraitement?.();
      },
      apresErreur: erreurs => {
        console.error("Erreur lors de la RMC inscription :", erreurs);
        AfficherMessage.erreur("Une erreur est survenue lors de la recherche multi-critères de RC/RCA/PACS", { erreurs });
        criteres.onErreur?.();
      }
    });
  }, [criteres]);

  return { resultat, rmcInscriptionEnCours };
};
