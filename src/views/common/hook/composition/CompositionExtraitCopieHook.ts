import { useEffect, useState } from "react";
import { compositionApi } from "../../../../api/appels/compositionApi";
import { IDonneesComposition } from "../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { IExtraitCopieComposition } from "../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import { logError, LogErrorMsg } from "../../util/LogManager";
import { getLibelle } from "../../util/Utils";

interface IExtraitCopieApiHookResultat {
  donneesComposition?: IDonneesComposition;
  erreur?: LogErrorMsg;
}

export function useExtraitCopieApiHook(
  extraitCopieComposition?: IExtraitCopieComposition
) {
  const [
    extraitCopieApiHookResultat,
    setExtraitCopieApiHookResultat
  ] = useState<IExtraitCopieApiHookResultat>();

  useEffect(() => {
    if (extraitCopieComposition) {
      let apiCompositionAAppeler;
      if (
        extraitCopieComposition.corps_image &&
        extraitCopieComposition.corps_image.length > 0
      ) {
        apiCompositionAAppeler = compositionApi.getCompositionCopieActeImage;
      } else {
        apiCompositionAAppeler =
          compositionApi.getCompositionExtraitOuCopieActeTexte;
      }

      apiCompositionAAppeler(extraitCopieComposition)
        .then(result => {
          setExtraitCopieApiHookResultat({
            donneesComposition: result.body.data
          });
        })
        .catch(error => {
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
  }, [extraitCopieComposition]);

  return extraitCopieApiHookResultat;
}
