import { TELEVERIFICATION_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/televerifications/generer";

interface IBody {
  idRequete: string;
  idDocument: string;
  idActe?: string;
  natureActe?: string;
  anneeEvenement?: number;
  nomTitulaire1?: string;
  nomTitulaire2?: string;
  pdf: string;
}

export const CONFIG_POST_SAUVEGARDER_DOCUMENTS: TConfigurationApi<typeof URI, IBody[]> = {
  api: TELEVERIFICATION_API,
  methode: "POST",
  uri: URI
};
