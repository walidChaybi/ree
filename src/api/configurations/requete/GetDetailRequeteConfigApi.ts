import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/:idRequete";

interface IQuery {
  isConsultation?: boolean;
  isConsultationHistoriqueAction?: boolean;
}

// TOREFACTOR typer le retour d'appel
export const CONFIG_GET_DETAIL_REQUETE: TConfigurationApi<typeof URI, undefined, IQuery, any> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI
};
