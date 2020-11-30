import { GroupementDocument } from "../../../model/requete/GroupementDocument";
import { MimeType } from "../../../ressources/MimeType";
import {
  IRequestDocumentApiResult,
  getDocumentASigner
} from "../../../api/appels/requeteApi";
import { IDocumentDelivre } from "../types/RequeteType";

export async function requestDocumentApi(
  identifiantDocument: string,
  groupement: GroupementDocument,
  mimeType: string = MimeType.APPLI_PDF
): Promise<IRequestDocumentApiResult> {
  return getDocumentASigner(identifiantDocument, groupement)
    .then(result => {
      let requestDocumentApiResult: IRequestDocumentApiResult;
      if (typeof result.body.data === "string") {
        // FIXME: changer le retour du back ou faire une deuxième api côté front
        // (en effet /piecesjustificatives renvoie une string alors que /documentsdelivres renvoie un DocumentDelivre)
        const documentDelivre = {
          contenu: result.body.data,
          nom: "",
          conteneurSwift: ""
        } as IDocumentDelivre;
        requestDocumentApiResult = {
          documentDelivre,
          mimeType
        };
      } else {
        const documentDelivre: IDocumentDelivre = result.body.data;
        requestDocumentApiResult = {
          documentDelivre,
          mimeType
        };
      }
      return Promise.resolve(requestDocumentApiResult);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
