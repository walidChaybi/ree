import { postDocumentReponseApi } from "@api/appels/requeteApi";
import { CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE } from "@api/configurations/requete/documentsReponses/GetDocumentsReponseDelivranceConfigApi";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import AfficherMessage, { estTableauErreurApi } from "../../../utils/AfficherMessage";

export function useGetDocumentReponseApi(idDocumentReponse?: string): IDocumentReponse | undefined {
  const [documentReponse, setDocumentReponse] = useState<IDocumentReponse | undefined>();

  const { appelApi: getDocumentReponse } = useFetchApi(CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE);

  useEffect(() => {
    if (idDocumentReponse) {
      getDocumentReponse({
        parametres: { path: { idDocumentReponse: idDocumentReponse } },
        apresSucces: document => setDocumentReponse(document),
        apresErreur: erreurs => AfficherMessage.erreur("Impossible de récupérer le document", { erreurs })
      });
    } else {
      setDocumentReponse({ id: "", contenu: "" } as IDocumentReponse);
    }
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
