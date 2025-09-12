import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/delivrance/:idRequete";

interface IQuery {
  refus: boolean;
  futurStatut: string;
}

// TODO Retirer le any une fois le typage de la requête de délivrance faite
export const CONFIG_PATCH_REQUETE_DELIVRANCE: TConfigurationApi<typeof URI, any, IQuery, { id: string }> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
