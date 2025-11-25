import { compositionApi } from "@api/appels/compositionApi";
import { ICourrierComposition } from "@model/composition/ICourrierComposition";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ICourrierParams {
  codeCourrier?: string;
  courrierComposition?: ICourrierComposition;
}

export const useCourrierApiHook = (courrierParams?: ICourrierParams) => {
  const [donneesComposition, setDonneesComposition] = useState<IDonneesComposition | undefined>();

  useEffect(() => {
    if (courrierParams?.codeCourrier && courrierParams.courrierComposition) {
      compositionApi
        .getCompositionCourrier(courrierParams.codeCourrier, courrierParams.courrierComposition)
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de créer le courrier", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [courrierParams]);

  return donneesComposition;
};
