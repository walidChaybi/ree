import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { ICertificatRCAComposition } from "../../../../../model/composition/ICertificatRCAComposition";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCertificatRCAApiHook(
  certificatRCAComposition?: ICertificatRCAComposition
) {
  const [contenuComposition, setContenuComposition] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (certificatRCAComposition) {
      compositionApi
        .getCompositionCertificatRCA(certificatRCAComposition)
        .then(result => {
          setContenuComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document de certificat RCA"
            )
          });
        });
    }
  }, [certificatRCAComposition]);

  return contenuComposition;
}
