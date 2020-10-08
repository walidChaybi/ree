import { GroupementDocument } from "../../../model/requete/GroupementDocument";
import { MimeType } from "../../../ressources/MimeType";
import {
  IRequestDocumentApiResult,
  getDocumentASigner
} from "../../../api/appels/requete";

export async function requestDocumentApi(
  identifiantDocument: string,
  groupement: GroupementDocument,
  mimeType: string = MimeType.APPLI_PDF
): Promise<IRequestDocumentApiResult> {
  return getDocumentASigner(identifiantDocument, groupement, mimeType);
}
