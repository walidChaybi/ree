import { useEffect, useState } from "react";
import { IDocumentReponse } from "../../../../model/requete/v2/IDocumentReponse";
import {
  getDocumentReponseById,
  postDocumentReponseApi
} from "../../../../api/appels/requeteApi";
import { logError } from "../../util/LogManager";

export function useGetDocumentReponseApi(
  idDocumentReponse?: string
): IDocumentReponse | undefined {
  const [documentReponse, setDocumentReponse] = useState<
    IDocumentReponse | undefined
  >();
  useEffect(() => {
    if (idDocumentReponse) {
      getDocumentReponseById(idDocumentReponse)
        .then(result => {
          setDocumentReponse(result.body.data);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de récupérer le document",
            error
          });
        });
    }
  }, [idDocumentReponse]);

  return documentReponse;
}

export function usePostDocumentsReponseApi(
  idRequete?: string,
  documentsReponse?: IDocumentReponse[]
): string[] | undefined {
  const [uuidPostDocuments, setUuidPostDocuments] = useState<
    string[] | undefined
  >();
  useEffect(() => {
    if (idRequete && documentsReponse && documentsReponse.length > 0) {
      postDocumentReponseApi(idRequete, documentsReponse)
        .then(result => {
          setUuidPostDocuments(result.body.data);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de stocker les documents",
            error
          });
        });
    }
  }, [idRequete, documentsReponse]);

  return uuidPostDocuments;
}
