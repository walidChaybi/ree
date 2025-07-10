import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/count";

interface IQuery {
  statuts: string;
}

export const CONFIG_GET_NOMBRE_REQUETES: TConfigurationApi<typeof URI, undefined, IQuery, number> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
