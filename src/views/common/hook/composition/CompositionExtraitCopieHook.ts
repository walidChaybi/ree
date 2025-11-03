import { compositionApi } from "@api/appels/compositionApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { IExtraitCopieComposition } from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { useEffect, useState } from "react";
import AfficherMessage from "../../../../utils/AfficherMessage";

interface LogErrorMsg {
  messageUtilisateur?: string;
  error?: any;
  errorInfo?: React.ErrorInfo | string;
}

export interface IExtraitCopieApiHookResultat {
  donneesComposition?: IDonneesComposition;
  erreur?: LogErrorMsg;
}
export interface IExtraitCopieApiHookParams {
  extraitCopieComposition?: IExtraitCopieComposition;
  choixDelivrance: ChoixDelivrance;
}

export function useExtraitCopieApiHook(params?: IExtraitCopieApiHookParams) {
  const [extraitCopieApiHookResultat, setExtraitCopieApiHookResultat] = useState<IExtraitCopieApiHookResultat>();

  useEffect(() => {
    if (params && params.extraitCopieComposition) {
      let apiCompositionAAppeler;

      if (ChoixDelivrance.estPlurilingue(params.choixDelivrance)) {
        apiCompositionAAppeler = compositionApi.getCompositionExtraitPlurilingue;
      } else if (params.extraitCopieComposition.corps_image && params.extraitCopieComposition.corps_image.length > 0) {
        apiCompositionAAppeler = compositionApi.getCompositionCopieActeImage;
      } else {
        apiCompositionAAppeler = compositionApi.getCompositionExtraitOuCopieActeTexte;
      }

      apiCompositionAAppeler(params.extraitCopieComposition)
        .then(result => {
          setExtraitCopieApiHookResultat({
            donneesComposition: result.body.data
          });
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          const messageUtilisateur = "Impossible de créer le document extrait ou copie de l'acte";

          setExtraitCopieApiHookResultat({
            erreur: {
              error: erreurs,
              messageUtilisateur
            }
          });
          AfficherMessage.erreur(messageUtilisateur, { erreurs });
        });
    }
  }, [params]);

  return extraitCopieApiHookResultat;
}
