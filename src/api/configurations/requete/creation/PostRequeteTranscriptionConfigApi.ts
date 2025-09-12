import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/creations";

export const CONFIG_POST_REQUETE_TRANSCRIPTION: TConfigurationApi<typeof URI, any, undefined, { id: string }[]> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};
