import { useEffect, useState } from "react";
import { deleteDocumentComplementaire } from "../../../../api/appels/requeteApi";
import { logError } from "../../util/LogManager";

export interface UseSupprimerDocumentComplementaireParams {
  idDocumentReponse: string;
  idRequete: string;
}

export function useSupprimerDocumentComplementaireApi(
  params?: UseSupprimerDocumentComplementaireParams
) {
  const [documentEstSupprimer, setDocumentEstSupprimer] = useState<
    boolean | null
  >();
  useEffect(() => {
    if (params && params.idDocumentReponse && params.idRequete) {
      deleteDocumentComplementaire(params.idDocumentReponse, params.idRequete)
        .then(result => {
          setDocumentEstSupprimer(true);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de supprimer le document complémentaire"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return documentEstSupprimer;
}
