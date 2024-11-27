import { TELEVERIFICATION_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";

const URI = "/televerifications/generer";

interface IBody {
  idRequete: string;
  idDocumentReponse: string;
  natureActe?: NatureActe;
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
