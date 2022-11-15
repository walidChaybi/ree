import { deleteDocumentComplementaire } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface ISupprimerDocumentComplementaireParams {
  idDocumentReponse: string;
  idRequete: string;
}

export interface ISupprimerDocumentComplementaireResultat {
  suppressionOk: boolean;
}

export function useSupprimerDocumentComplementaireApi(
  params?: ISupprimerDocumentComplementaireParams
): ISupprimerDocumentComplementaireResultat | undefined {
  const [documentEstSupprimer, setDocumentEstSupprimer] =
    useState<ISupprimerDocumentComplementaireResultat>();
  useEffect(() => {
    if (params && params.idDocumentReponse && params.idRequete) {
      deleteDocumentComplementaire(params.idDocumentReponse, params.idRequete)
        .then(result => {
          setDocumentEstSupprimer({ suppressionOk: true });
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
