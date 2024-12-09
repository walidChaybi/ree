import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/:idActe/abandonner-mise-a-jour";

export const CONFIG_PATCH_ABONDON_MISE_A_JOUR_ACTE: TConfigurationApi<typeof URI> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI
};
