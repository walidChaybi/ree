import {
  getDocumentReponseById,
  IMiseAJourDocumentParams,
  patchDocumentsReponsesAvecSignature,
  postDocumentReponseApi
} from "@api/appels/requeteApi";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useGetDocumentReponseApi(
  idDocumentReponse?: string
): IDocumentReponse | undefined {
  const [documentReponse, setDocumentReponse] = useState<
    IDocumentReponse | undefined
  >();
  useEffect(() => {
    async function fetchData() {
      if (idDocumentReponse) {
        try {
          const result = await getDocumentReponseById(idDocumentReponse);
          setDocumentReponse(result.body.data);
        } catch (error) {
          logError({
            messageUtilisateur: "Impossible de récupérer le document",
            error
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

export function usePostDocumentsReponseApi(
  idRequete?: string,
  documentsReponse?: IDocumentReponse[]
): string[] | undefined {
  const [uuidPostDocuments, setUuidPostDocuments] = useState<
    string[] | undefined
  >();
  useEffect(() => {
    async function fetchData() {
      if (idRequete && documentsReponse && documentsReponse.length > 0) {
        try {
          const result = await postDocumentReponseApi(
            idRequete,
            documentsReponse
          );
          setUuidPostDocuments(result.body.data);
        } catch (error) {
          logError({
            messageUtilisateur: "Impossible de stocker les documents",
            error
          });
        }
      }
    }
    fetchData();
  }, [idRequete, documentsReponse]);

  return uuidPostDocuments;
}

export interface IResultatPatchDocumentReponse {
  idRequete?: string;
  erreur?: any;
}

export function usePatchDocumentsReponseAvecSignatureApi(
  miseAJourDocumentParams?: IMiseAJourDocumentParams[]
) {
  const [resultatPatchDocumentReponse, setResultatPatchDocumentReponse] =
    useState<IResultatPatchDocumentReponse>();

  useEffect(() => {
    if (miseAJourDocumentParams && miseAJourDocumentParams.length > 0) {
      patchDocumentsReponsesAvecSignature(miseAJourDocumentParams)
        .then(result => {
          setResultatPatchDocumentReponse({ idRequete: result.body.data });
        })
        .catch(error => {
          setResultatPatchDocumentReponse({ erreur: error });
        });
    }
  }, [miseAJourDocumentParams]);

  return resultatPatchDocumentReponse;
}
