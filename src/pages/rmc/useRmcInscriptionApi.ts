import { CONFIG_POST_RMC_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCInscriptionConfigApi";
import { mappingCriteres, rmcInscriptionAutorisee } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import messageManager from "@util/messageManager";
import { useCallback } from "react";
import useFetchApi from "../../hooks/api/FetchApiHook";

export const useRmcInscriptionApi = (
  setDataRMCInscription: React.Dispatch<React.SetStateAction<TResultatRMCInscription[] | null>>,
  setDataTableauRMCInscription: React.Dispatch<React.SetStateAction<IParamsTableau | null>>,
  setIdFicheActe: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const { appelApi: getRMCInscription, enAttenteDeReponseApi: enAttenteRMCInscription } = useFetchApi(CONFIG_POST_RMC_INSCRIPTION);

  const appellerRmcInscriptionApi = useCallback((valeursformulaire: IRMCActeInscriptionForm, range: string, ficheIdentifiant?: string) => {
    const criteres = mappingCriteres(RMCActeInscriptionForm.versDto(valeursformulaire) as IRMCActeInscription);

    if (!rmcInscriptionAutorisee(criteres)) {
      setDataRMCInscription([]);
      setDataTableauRMCInscription(PARAMS_TABLEAU_VIDE);
      return;
    }

    getRMCInscription({
      parametres: {
        body: criteres,
        query: {
          range
        }
      },
      apresSucces: (inscriptions, headers) => {
        setDataRMCInscription(
          inscriptions
            .map(ResultatRMCInscription.depuisDto)
            .filter((inscription): inscription is TResultatRMCInscription => inscription !== null)
        );
        setDataTableauRMCInscription(getParamsTableauDepuisHeaders(headers));
        setIdFicheActe(ficheIdentifiant);
      },
      apresErreur: () => {
        messageManager.showErrorAndClose("Impossible de récupérer les inscriptions via la recherche multi-critères");
      }
    });
  }, []);

  return { appellerRmcInscriptionApi, enAttenteRMCInscription };
};
