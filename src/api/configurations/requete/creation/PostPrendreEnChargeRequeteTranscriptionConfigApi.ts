import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/creation/:idRequete/transcription/prendre-en-charge";

export const CONFIG_POST_PRENDRE_EN_CHARGE: TConfigurationApi<typeof URI, undefined, undefined, string> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
