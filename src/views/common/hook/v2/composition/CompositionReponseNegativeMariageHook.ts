import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { IReponseNegativeMariageComposition } from "../../../../../model/composition/IReponseNegativeMariageComposition";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCompositionReponseNegativeMariageApi(
  reponseNegative?: IReponseNegativeMariageComposition
) {
  const [contenuComposition, setContenuComposition] = useState<string>();

  useEffect(() => {
    if (reponseNegative) {
      compositionApi
        .getCompositionReponseNegativeTraceMariage(reponseNegative)
        .then(result => {
          setContenuComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document pour la réponse négative"
            )
          });
        });
    }
  }, [reponseNegative]);

  return contenuComposition;
}
