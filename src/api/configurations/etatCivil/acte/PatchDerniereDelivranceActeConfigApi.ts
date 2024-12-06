import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/:idActe/dernieredelivrance";

export const CONFIG_PATCH_DERNIERE_DELIVRANCE_ACTE: TConfigurationApi<typeof URI> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI
};
