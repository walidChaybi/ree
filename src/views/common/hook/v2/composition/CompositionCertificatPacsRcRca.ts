import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { TypeCertificatComposition } from "../../../../../model/composition/type/TypeCertificatCompoistion";
import { TypePacsRcRca } from "../../../../../model/etatcivil/enum/TypePacsRcRca";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCertificatPacsRcRcaApiHook(
  typeCertificat: TypePacsRcRca,
  certificatComposition?: TypeCertificatComposition
) {
  const [contenuComposition, setContenuComposition] = useState<string>();

  useEffect(() => {
    if (certificatComposition) {
      compositionApi
        .getCompositionCertificatPacsRcRca(
          certificatComposition,
          typeCertificat
        )
        .then(result => {
          setContenuComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document de certificat PACS"
            )
          });
        });
    }
  }, [certificatComposition, typeCertificat]);

  return contenuComposition;
}
