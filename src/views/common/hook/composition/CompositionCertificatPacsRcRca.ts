import { compositionApi } from "@api/appels/compositionApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { TypeCertificatComposition } from "@model/composition/type/TypeCertificatCompoistion";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";

export function useCertificatPacsRcRcaApiHook(typeCertificat: ETypePacsRcRca, certificatComposition?: TypeCertificatComposition) {
  const [donneesComposition, setDonneesComposition] = useState<IDonneesComposition>();

  useEffect(() => {
    if (certificatComposition) {
      compositionApi
        .getCompositionCertificatPacsRcRca(certificatComposition, typeCertificat)
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle("Impossible de créer le document de certificat PACS")
          });
        });
    }
  }, [certificatComposition, typeCertificat]);

  return donneesComposition;
}
