import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { IContenuReponseNegative } from "../../../../../model/composition/IReponseNegative";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCompositionReponseNegativeApi(
  document?: string,
  reponseNegative?: IContenuReponseNegative
) {
  const [contenuComposition, setContenuComposition] = useState<string>();

  useEffect(() => {
    if (reponseNegative && document) {
      compositionApi
        .getCompositionReponseNegative(document, reponseNegative)
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
  }, [reponseNegative, document]);

  return contenuComposition;
}
