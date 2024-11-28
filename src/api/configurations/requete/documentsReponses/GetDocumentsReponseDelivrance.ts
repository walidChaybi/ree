import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/documentsreponses/:idDcumentReponse";

interface IDocumentReponseDto {
  contenu: string;
}

export const CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE: TConfigurationApi<typeof URI, undefined, undefined, IDocumentReponseDto> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI
};
