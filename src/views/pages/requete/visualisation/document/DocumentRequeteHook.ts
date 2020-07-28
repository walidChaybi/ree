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
      const documentDelivre: IDocumentDelivre = result.body.data;
      const requestDocumentApiResult: IRequestDocumentApiResult = {
        documentDelivre,
        mimeType,
      };
      return Promise.resolve(requestDocumentApiResult);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
