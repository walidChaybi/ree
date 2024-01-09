import { miseAJourStatutRequeteEtAvancementProjetApresSignature } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect } from "react";

export interface IModifierStatutRequeteEtAvancementProjetApresSignatureParams {
  idRequete?: string;
  idSuiviDossier?: string;
}

const useModifierStatutRequeteEtAvancementProjetApresSignatureApiHook = (
  parametres?: IModifierStatutRequeteEtAvancementProjetApresSignatureParams
): void => {
  useEffect(() => {
    if (parametres?.idRequete && parametres?.idSuiviDossier) {
      miseAJourStatutRequeteEtAvancementProjetApresSignature(
        parametres.idRequete,
        parametres.idSuiviDossier
      ).catch(error => {
        logError({
          error,
          messageUtilisateur:
            "Impossible de modifier le statut de la requete et l'avancement du projet d'acte après signature de l'acte."
        });
      });
    }
  }, [parametres]);
};

export default useModifierStatutRequeteEtAvancementProjetApresSignatureApiHook;
