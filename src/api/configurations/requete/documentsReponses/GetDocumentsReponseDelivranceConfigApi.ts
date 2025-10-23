import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";

const URI = "/documentsreponses/:idDocumentReponse";

export const CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE: TConfigurationApi<typeof URI, undefined, undefined, IDocumentReponse> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
