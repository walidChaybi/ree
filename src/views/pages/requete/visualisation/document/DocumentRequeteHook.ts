import { ApiManager, HttpMethod } from "../../../../../api/ApiManager";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";

export async function requestDocumentApi(
  identifiantDocument: string,
  groupement: GroupementDocument,
  mimeType: string = "application/pdf"
): Promise<Blob> {
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
      return Promise.resolve(convertToBlob(result.body.data, mimeType));
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function convertToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
