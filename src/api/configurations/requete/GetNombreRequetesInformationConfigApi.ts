import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/information/count";

interface IQuery {
  statuts: string;
}

export const CONFIG_GET_NOMBRE_REQUETES_INFORMATION: TConfigurationApi<typeof URI, undefined, IQuery, number> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI
};
