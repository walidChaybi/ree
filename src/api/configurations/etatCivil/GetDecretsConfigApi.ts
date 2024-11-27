import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IDecret } from "@model/etatcivil/commun/IDecret";

const URI = "/repertoirecivil/decrets";

export const CONFIG_GET_DECRETS: TConfigurationApi<
  typeof URI,
  undefined,
  undefined,
  IDecret[]
> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};
