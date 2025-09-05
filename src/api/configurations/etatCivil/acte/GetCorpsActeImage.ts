import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IImageActe } from "@model/etatcivil/commun/IImageActe";

const URI = "/acte/:idActe/corps-image";

export const CONFIG_GET_CORPS_ACTE_IMAGE: TConfigurationApi<typeof URI, undefined, undefined, IImageActe> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
