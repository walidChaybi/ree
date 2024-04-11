import { mettreAJourStatutApresSignature } from "@api/appels/requeteApi";
import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { IModifierStatutRequeteApresSignature } from "@model/requete/IModifierStatutRequeteApresSignature";
import { logError } from "@util/LogManager";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IMettreAJourStatutApresSignatureParams {
  idRequete?: string;
  idSuiviDossier?: string;
}

const useMettreAJourStatutApresSignatureApiHook = (
  parametres?: IMettreAJourStatutApresSignatureParams
): IModifierStatutRequeteApresSignature | undefined => {
  const [resultat, setResultat] =
    useState<IModifierStatutRequeteApresSignature>();

  useEffect(() => {
    if (parametres?.idRequete && parametres?.idSuiviDossier) {
      mettreAJourStatutApresSignature(
        parametres.idRequete,
        parametres.idSuiviDossier
      )
        .then(reponse =>
          setResultat({
            codeReponse: reponse.status
          })
        )
        .catch(errors => {
          const premiereErreur: any | undefined = JSON.parse(errors?.message)
            ?.errors[ZERO];
          const erreur: IErreurTraitementApi = {
            code: premiereErreur?.code,
            message: premiereErreur?.message
          };
          setResultat({
            codeReponse: errors.status,
            erreur
          });
          logError({
            error: errors,
            messageUtilisateur:
              "Impossible de modifier le statut de la requete et l'avancement du projet d'acte après signature de l'acte."
          });
        });
    }
  }, [parametres]);

  return resultat;
};

export default useMettreAJourStatutApresSignatureApiHook;
