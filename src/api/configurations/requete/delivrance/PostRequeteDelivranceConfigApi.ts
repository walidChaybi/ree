import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/delivrance";

interface IQuery {
  refus: boolean;
  futurStatut: string;
}

export const CONFIG_POST_REQUETE_DELIVRANCE: TConfigurationApi<typeof URI, any, IQuery, { id: string }> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
