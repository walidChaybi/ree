import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/:idActe/donnees-pour-composition-acte-repris";

export const CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_REPRIS: TConfigurationApi<typeof URI, undefined, undefined, string> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
