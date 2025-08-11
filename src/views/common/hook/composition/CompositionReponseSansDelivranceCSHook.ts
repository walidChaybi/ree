import { compositionApi } from "@api/appels/compositionApi";
import { IContenuReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useCompositionReponseSansDelivranceCSApi(document?: string, reponseSansDelivranceCS?: IContenuReponseSansDelivranceCS) {
  const [donneesComposition, setDonneesComposition] = useState<IDonneesComposition>();

  useEffect(() => {
    if (reponseSansDelivranceCS && document) {
      compositionApi
        .getCompositionReponseSansDelivranceCS(document, reponseSansDelivranceCS)
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de créer le document pour la réponse négative", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [reponseSansDelivranceCS, document]);

  return donneesComposition;
}
