import { getDocumentReponseById, postDocumentReponseApi } from "@api/appels/requeteApi";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../utils/AfficherMessage";

export function useGetDocumentReponseApi(idDocumentReponse?: string): IDocumentReponse | undefined {
  const [documentReponse, setDocumentReponse] = useState<IDocumentReponse | undefined>();
  useEffect(() => {
    async function fetchData() {
      if (idDocumentReponse) {
        try {
          const result = await getDocumentReponseById(idDocumentReponse);
          setDocumentReponse(result.body.data);
        } catch (erreurs) {
          AfficherMessage.erreur("Impossible de récupérer le document", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        }
      } else {
        setDocumentReponse({ id: "", contenu: "" } as IDocumentReponse);
      }
    }
    fetchData();
  }, [idDocumentReponse]);

  return documentReponse;
}

export function usePostDocumentsReponseApi(idRequete?: string, documentsReponse?: IDocumentReponse[]): string[] | undefined {
  const [uuidPostDocuments, setUuidPostDocuments] = useState<string[] | undefined>();
  useEffect(() => {
    async function fetchData() {
      if (idRequete && documentsReponse && documentsReponse.length > 0) {
        try {
          const result = await postDocumentReponseApi(idRequete, documentsReponse);
          setUuidPostDocuments(result.body.data);
        } catch (erreurs) {
          AfficherMessage.erreur("Impossible de stocker les documents", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        }
      }
    }
    fetchData();
  }, [idRequete, documentsReponse]);

  return uuidPostDocuments;
}
