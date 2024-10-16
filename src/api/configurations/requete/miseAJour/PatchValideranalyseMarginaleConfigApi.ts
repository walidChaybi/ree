import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/analyse-marginale/validation/acte/:idActe";

export const CONFIG_PATCH_VALIDER_ANALYSE_MARGINALE: TConfigurationApi<
  typeof URI
> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI
};
