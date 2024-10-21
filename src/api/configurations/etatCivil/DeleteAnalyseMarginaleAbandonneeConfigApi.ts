import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/analyse-marginale/acte/:idActe";

export const CONFIG_DELETE_ANALYSE_MARGINALE_ABANDONNEE: TConfigurationApi<typeof URI> = {
  api: ETATCIVIL_API,
  methode: "DELETE",
  uri: URI
};
