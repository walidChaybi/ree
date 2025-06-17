import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/count";

interface IQuery {
  statuts: string;
}

export const CONFIG_GET_NOMBRE_REQUETE: TConfigurationApi<typeof URI, undefined, IQuery, number> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
