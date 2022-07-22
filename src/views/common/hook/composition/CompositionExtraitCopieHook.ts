import { useEffect, useState } from "react";
import { compositionApi } from "../../../../api/appels/compositionApi";
import { IDonneesComposition } from "../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { IExtraitCopieComposition } from "../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import { ChoixDelivrance } from "../../../../model/requete/enum/ChoixDelivrance";
import { logError, LogErrorMsg } from "../../util/LogManager";
import { getLibelle } from "../../util/Utils";

export interface IExtraitCopieApiHookResultat {
  donneesComposition?: IDonneesComposition;
  erreur?: LogErrorMsg;
}
export interface IExtraitCopieApiHookParams {
  extraitCopieComposition?: IExtraitCopieComposition;
  choixDelivrance: ChoixDelivrance;
}

export function useExtraitCopieApiHook(params?: IExtraitCopieApiHookParams) {
  const [extraitCopieApiHookResultat, setExtraitCopieApiHookResultat] =
    useState<IExtraitCopieApiHookResultat>();

  useEffect(() => {
    if (params && params.extraitCopieComposition) {
      let apiCompositionAAppeler;
      if (ChoixDelivrance.estPlurilingue(params.choixDelivrance)) {
        apiCompositionAAppeler =
          compositionApi.getCompositionExtraitPlurilingue;
      } else if (
        params.extraitCopieComposition.corps_image &&
        params.extraitCopieComposition.corps_image.length > 0
      ) {
        apiCompositionAAppeler = compositionApi.getCompositionCopieActeImage;
      } else {
        apiCompositionAAppeler =
          compositionApi.getCompositionExtraitOuCopieActeTexte;
      }

      apiCompositionAAppeler(params.extraitCopieComposition)
        .then(result => {
          setExtraitCopieApiHookResultat({
            donneesComposition: result.body.data
          });
        })
        .catch(error => {
          /* istanbul ignore next */
          const erreur = {
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document extrait ou copie de l'acte"
            )
          };
          logError(erreur);
          setExtraitCopieApiHookResultat({ erreur });
        });
    }
  }, [params]);

  return extraitCopieApiHookResultat;
}
