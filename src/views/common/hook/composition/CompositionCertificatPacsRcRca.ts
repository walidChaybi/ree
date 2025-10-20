import { compositionApi } from "@api/appels/compositionApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { TypeCertificatComposition } from "@model/composition/type/TypeCertificatCompoistion";
import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useCertificatPacsRcRcaApiHook(typeCertificat: ETypeRcRcaPacs, certificatComposition?: TypeCertificatComposition) {
  const [donneesComposition, setDonneesComposition] = useState<IDonneesComposition>();

  useEffect(() => {
    if (certificatComposition) {
      compositionApi
        .getCompositionCertificatPacsRcRca(certificatComposition, typeCertificat)
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de créer le document de certificat PACS", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [certificatComposition, typeCertificat]);

  return donneesComposition;
}
