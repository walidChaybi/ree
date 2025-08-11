import { compositionApi } from "@api/appels/compositionApi";
import { ICertificatSituationComposition } from "@model/composition/ICertificatSituationComposition";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useCertificatSituationApiHook(certificatSituationComposition?: ICertificatSituationComposition) {
  const [donneesComposition, setDonneesComposition] = useState<IDonneesComposition | undefined>();

  useEffect(() => {
    if (certificatSituationComposition) {
      compositionApi
        .getCompositionCertificatSituation(certificatSituationComposition)
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de créer le document de certificat de situation", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [certificatSituationComposition]);

  return donneesComposition;
}
