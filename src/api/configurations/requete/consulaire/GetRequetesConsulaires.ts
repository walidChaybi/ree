import { REQUETE_API } from "@api/ApiDisponibles";

import { TConfigurationApi } from "@model/api/Api";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
const URI = "/requetes/creation/mes-requetes";

interface IQueryParams {
  /** Statuts des requêtes à récupérer séparés par une virgule */
  statuts: string;
  /** Sous-types des requêtes à récupérer séparés par une virgule */
  sousTypes: string;
  tri: string;
  sens: string;
  range: string;
}

// TODO : créer un DTO
export const CONFIG_GET_REQUETES_CONSULAIRES: TConfigurationApi<typeof URI, undefined, IQueryParams, IRequeteConsulaire[]> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
