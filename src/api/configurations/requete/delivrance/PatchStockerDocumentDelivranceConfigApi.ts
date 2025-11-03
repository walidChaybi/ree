import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/delivrance/:idRequete/document";

interface IQuery {
  libelleAction: string;
  statutRequete: string;
}

export const CONFIG_PATCH_STOCKER_DOCUMENT_DELIVRANCE: TConfigurationApi<typeof URI, Object, IQuery, string[]> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
