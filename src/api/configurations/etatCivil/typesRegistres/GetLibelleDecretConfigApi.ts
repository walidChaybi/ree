import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/types-registres/:idTypeRegistre/libelle-decret";

export const CONFIG_GET_LIBELLE_DECRET: TConfigurationApi<typeof URI, undefined, undefined, { libelleDecret: string }> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
