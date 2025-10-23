import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/creation/:idRequete";

const CONFIG_PATCH_REQUETE_TRANSCRIPTION: TConfigurationApi<typeof URI, any, undefined, { id: string }[]> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI
};
