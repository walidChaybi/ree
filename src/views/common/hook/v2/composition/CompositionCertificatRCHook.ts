import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { ICertificatRCComposition } from "../../../../../model/composition/ICertificatRCComposition";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCertificatRCApiHook(
  certificatRCComposition?: ICertificatRCComposition
) {
  const [contenuComposition, setContenuComposition] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (certificatRCComposition) {
      compositionApi
        .getCompositionCertificatRC(certificatRCComposition)
        .then(result => {
          setContenuComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document de certificat RC"
            )
          });
        });
    }
  }, [certificatRCComposition]);

  return contenuComposition;
}
