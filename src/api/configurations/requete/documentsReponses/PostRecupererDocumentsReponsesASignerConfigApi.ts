import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/documentsreponses/a-signer";

interface IReponseItem {
  id: string;
  idRequete: string;
  numeroFonctionnel: string;
  contenu: string;
}

export const CONFIG_POST_RECUPERER_DOCUMENTS_REPONSES_A_SIGNER: TConfigurationApi<typeof URI, string[], undefined, IReponseItem[]> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};
