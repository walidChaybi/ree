import { useEffect, useState } from "react";
import { compositionApi } from "../../../../api/appels/compositionApi";
import { IDonneesComposition } from "../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { ICertificatSituationComposition } from "../../../../model/composition/ICertificatSituationComposition";
import { logError } from "../../util/LogManager";
import { getLibelle } from "../../util/Utils";

export function useCertificatSituationApiHook(
  certificatSituationComposition?: ICertificatSituationComposition
) {
  const [donneesComposition, setDonneesComposition] = useState<
    IDonneesComposition | undefined
  >();

  useEffect(() => {
    if (certificatSituationComposition) {
      compositionApi
        .getCompositionCertificatSituation(certificatSituationComposition)
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document de certificat de situation"
            )
          });
        });
    }
  }, [certificatSituationComposition]);

  return donneesComposition;
}
