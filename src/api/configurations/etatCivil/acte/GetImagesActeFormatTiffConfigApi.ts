import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IImage } from "@model/etatcivil/acte/imageActe/IImage";

const URI = "/acteimage/images/:idActe";

export const CONFIG_GET_IMAGES_ACTE_FORMAT_TIFF: TConfigurationApi<typeof URI, undefined, undefined, IImage[]> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
