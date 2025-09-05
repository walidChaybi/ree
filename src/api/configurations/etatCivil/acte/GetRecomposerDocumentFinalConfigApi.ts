/* v8 ignore start : pas testable car composant de views */
import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/:idActe/recomposer-document-final";

export const CONFIG_GET_RECOMPOSER_DOCUMENT_FINAL: TConfigurationApi<typeof URI, undefined, undefined, Blob> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
/* v8 ignore stop*/
