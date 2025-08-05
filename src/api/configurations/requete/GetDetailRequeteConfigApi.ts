import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { TRequete } from "@model/requete/IRequete";

const URI = "/requetes/:idRequete";

interface IQuery {
  isConsultationHistoriqueAction?: boolean;
}

export const CONFIG_GET_DETAIL_REQUETE: TConfigurationApi<typeof URI, undefined, IQuery, TRequete> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI
};
