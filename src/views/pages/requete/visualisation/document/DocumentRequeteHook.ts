import { ApiManager, HttpMethod } from "../../../../../api/ApiManager";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { IDocumentDelivre } from "../RequeteType";
import { MimeType } from "../../../../../ressources/MimeType";

export interface IRequestDocumentApiResult {
  documentDelivre: IDocumentDelivre;
  mimeType: string;
}

export async function requestDocumentApi(
  identifiantDocument: string,
  groupement: GroupementDocument,
  mimeType: string = MimeType.APPLI_PDF
): Promise<IRequestDocumentApiResult> {
  const api = ApiManager.getInstance("rece-requete-api", "v1");
  const groupementEndPoint: string =
    groupement !== GroupementDocument.DocumentAsigner
      ? groupement
      : GroupementDocument.CourrierAccompagnement;
  return api
    .fetch({
      method: HttpMethod.GET,
      uri: `/${groupementEndPoint}/${identifiantDocument}`
    })
    .then(result => {
      let requestDocumentApiResult: IRequestDocumentApiResult;
      if (typeof result.body.data === "string") {
        // FIXME: changer le retour du back ou faire une deuxième api côté front (en effet /piecesjustificatives renvoie une string alors que /documentsdelivres renvoie un DocumentDelivre)
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
