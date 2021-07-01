import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { ICertificatSituationComposition } from "../../../../../model/composition/ICertificatSituationComposition";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCertificatSituationRmcAutoVideApi(
  certificatSituationComposition?: ICertificatSituationComposition
) {
  const [contenuComposition, setContenuComposition] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (certificatSituationComposition) {
      compositionApi
        .getCompositionCertificatSituation(certificatSituationComposition)
        .then(result => {
          setContenuComposition(result.body.data);
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

  return contenuComposition;
}
