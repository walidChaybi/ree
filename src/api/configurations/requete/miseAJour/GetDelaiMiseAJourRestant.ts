import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/mise-a-jour/:idRequete/delai-de-traitement-restant-en-minutes";

export const CONFIG_GET_DELAI_MISE_A_JOUR_RESTANT: TConfigurationApi<typeof URI, undefined, undefined, number> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI
};
