import { mettreAJourStatutApresSignature } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect } from "react";

export interface IMettreAJourStatutApresSignatureParams {
  idRequete?: string;
  idSuiviDossier?: string;
}

const useMettreAJourStatutApresSignatureApiHook = (
  parametres?: IMettreAJourStatutApresSignatureParams
): void => {
  useEffect(() => {
    if (parametres?.idRequete && parametres?.idSuiviDossier) {
      mettreAJourStatutApresSignature(
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

export default useMettreAJourStatutApresSignatureApiHook;
