import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/creation/:idRequete/statut";

interface IQuery {
  statut: string;
  raisonStatut?: string;
  force?: boolean;
}

export const CONFIG_PATCH_STATUT_REQUETE_CREATION: TConfigurationApi<typeof URI, undefined, IQuery> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI
};
