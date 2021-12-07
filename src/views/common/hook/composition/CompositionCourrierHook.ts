import { useEffect, useState } from "react";
import { compositionApi } from "../../../../api/appels/compositionApi";
import { IDonneesComposition } from "../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { ICourrierComposition } from "../../../../model/composition/ICourrierComposition";
import { logError } from "../../util/LogManager";
import { getLibelle } from "../../util/Utils";

export interface ICourrierParams {
  codeCourrier?: string;
  courrierComposition?: ICourrierComposition;
}

export function useCourrierApiHook(courrierParams?: ICourrierParams) {
  const [donneesComposition, setDonneesComposition] = useState<
    IDonneesComposition | undefined
  >();

  useEffect(() => {
    if (courrierParams?.codeCourrier && courrierParams.courrierComposition) {
      compositionApi
        .getCompositionCourrier(
          courrierParams.codeCourrier,
          courrierParams.courrierComposition
        )
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle("Impossible de créer le courrier")
          });
        });
    }
  }, [courrierParams]);

  return donneesComposition;
}
