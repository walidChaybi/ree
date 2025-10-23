import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/documentsreponses/:idDocumentReponse/format-image";

export const CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE_FORMAT_IMAGE: TConfigurationApi<typeof URI, undefined, undefined, string[]> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
