import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { ICourrierComposition } from "../../../../../model/composition/ICourrierComposition";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export interface ICourrierParams {
  codeCourrier?: string;
  courrierComposition?: ICourrierComposition;
}

export function useCourrierApiHook(courrierParams?: ICourrierParams) {
  const [contenuComposition, setContenuComposition] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (courrierParams?.codeCourrier && courrierParams.courrierComposition) {
      compositionApi
        .getCompositionCourrier(
          courrierParams.codeCourrier,
          courrierParams.courrierComposition
        )
        .then(result => {
          setContenuComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle("Impossible de créer le courrier")
          });
        });
    }
  }, [courrierParams]);

  return contenuComposition;
}
