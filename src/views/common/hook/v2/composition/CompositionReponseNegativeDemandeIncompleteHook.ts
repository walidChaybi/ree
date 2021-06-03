import { IReponseNegativeDemandeIncomplete } from "../../../../../model/composition/IReponseNegativeDemandeIncomplete";
import { useEffect, useState } from "react";
import { logError } from "../../../util/LogManager";
import { compositionApi } from "../../../../../api/appels/compositionApi";

export function useCompositionReponseNegativeDemandeIncompleteApi(
  reponseNegative?: IReponseNegativeDemandeIncomplete
) {
  const [contenuComposition, setContenuComposition] = useState<string>();

  useEffect(() => {
    if (reponseNegative) {
      compositionApi
        .getCompositionReponseNegativeDemandeIncomplete(reponseNegative)
        .then(result => {
          setContenuComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de créer le document pour la réponse négative"
          });
        });
    }
  }, [reponseNegative]);

  return contenuComposition;
}
