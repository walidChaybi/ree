import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/documentsreponses/signature-par-lot";

interface IBody {
  id: string;
  idRequete: string;
  numeroFonctionnel: string;
  contenu: string;
}

export const CONFIG_PATCH_SIGNATURE_PAR_LOT_DOCUMENTS_REPONSES: TConfigurationApi<typeof URI, IBody[]> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};
