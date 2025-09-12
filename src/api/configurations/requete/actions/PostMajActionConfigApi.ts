import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IQuery {
  libelleAction: string;
  idRequete: string;
}

const URI = "/requetes/action";

export const CONFIG_POST_MAJ_ACTION: TConfigurationApi<typeof URI, undefined, IQuery, string> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
