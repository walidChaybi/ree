import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { mappingCriteres, rmcActeAutorisee } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { useCallback } from "react";
import useFetchApi from "../../hooks/api/FetchApiHook";
import AfficherMessage from "../../utils/AfficherMessage";

export const useRmcActeApi = (
  setDataRMCActe: React.Dispatch<React.SetStateAction<ResultatRMCActe[] | null>>,
  setDataTableauRMCActe: React.Dispatch<React.SetStateAction<IParamsTableau | null>>,
  setIdFicheActe: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const { appelApi: getRMCActe, enAttenteDeReponseApi: enAttenteRMCActe } = useFetchApi(CONFIG_POST_RMC_ACTE);

  const appellerRmcActeApi = useCallback((valeursformulaire: IRMCActeInscriptionForm, range: string, ficheIdentifiant?: string) => {
    const criteres = mappingCriteres(RMCActeInscriptionForm.versDto(valeursformulaire) as IRMCActeInscription);

    if (!rmcActeAutorisee(criteres)) {
      setDataRMCActe([]);
      setDataTableauRMCActe(PARAMS_TABLEAU_VIDE);
      return;
    }

    getRMCActe({
      parametres: {
        body: criteres,
        query: {
          range
        }
      },
      apresSucces: (actes, headers) => {
        setDataRMCActe(actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null));
        setDataTableauRMCActe(getParamsTableauDepuisHeaders(headers));
        setIdFicheActe(ficheIdentifiant);
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Impossible de récupérer les actes de la recherche multi-critères", { erreurs, fermetureAuto: true });
      }
    });
  }, []);

  return { appellerRmcActeApi, enAttenteRMCActe };
};
