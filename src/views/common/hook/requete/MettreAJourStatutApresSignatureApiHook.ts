import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { mettreAJourStatutApresSignature } from "@api/appels/requeteApi";
import { IModifierStatutRequeteApresSignature } from "@model/requete/IModifierStatutRequeteApresSignature";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IMettreAJourStatutApresSignatureParams {
  idRequete?: string;
  idSuiviDossier?: string;
}

const useMettreAJourStatutApresSignatureApiHook = (
  parametres?: IMettreAJourStatutApresSignatureParams
): IModifierStatutRequeteApresSignature | undefined => {
  const [resultat, setResultat] = useState<IModifierStatutRequeteApresSignature>();

  useEffect(() => {
    if (parametres?.idRequete && parametres?.idSuiviDossier) {
      mettreAJourStatutApresSignature(parametres.idRequete, parametres.idSuiviDossier)
        .then(reponse =>
          setResultat({
            codeReponse: reponse.status
          })
        )
        .catch(erreurs => {
          const premiereErreur: any | undefined = JSON.parse(erreurs?.message)?.errors[ZERO];
          const erreur: IErreurTraitementApi = {
            code: premiereErreur?.code,
            message: premiereErreur?.message
          };
          setResultat({
            codeReponse: erreurs.status,
            erreur
          });
          AfficherMessage.erreur(
            "Impossible de modifier le statut de la requete et l'avancement du projet d'acte après signature de l'acte.",
            {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            }
          );
        });
    }
  }, [parametres]);

  return resultat;
};

export default useMettreAJourStatutApresSignatureApiHook;
