import { ApiManager, HttpMethod } from "../../../../../api/ApiManager";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { IDocumentDelivre } from "../RequeteType";

export interface IRequestDocumentApiResult {
  documentDelivre: IDocumentDelivre;
  mimeType: string;
}

export async function requestDocumentApi(
  identifiantDocument: string,
  groupement: GroupementDocument,
  mimeType: string = "application/pdf"
): Promise<IRequestDocumentApiResult> {
  const api = ApiManager.getInstance("rece-requete-api", "v1");
  const groupementEndPoint: string =
    groupement !== GroupementDocument.DocumentAsigner
      ? groupement
      : GroupementDocument.CourrierAccompagnement;
  return api
    .fetch({
      method: HttpMethod.GET,
      uri: `/${groupementEndPoint}/${identifiantDocument}`,
    })
    .then((result) => {
      let requestDocumentApiResult: IRequestDocumentApiResult;
      if (typeof result.body.data === "string") {
        // FIXME: changer le retour du back ou faire une deuxième api côté front
        const documentDelivre = {
          contenu: result.body.data,
          nom: "",
          conteneurSwift: "",
        } as IDocumentDelivre;
        requestDocumentApiResult = {
          documentDelivre,
          mimeType,
        };
      } else {
        const documentDelivre: IDocumentDelivre = result.body.data;
        requestDocumentApiResult = {
          documentDelivre,
          mimeType,
        };
      }
      return Promise.resolve(requestDocumentApiResult);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
