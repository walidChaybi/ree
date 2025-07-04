import { AGENT_API } from "@api/ApiDisponibles";
import { IUtilisateurDto } from "@model/agent/Utilisateur";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/utilisateurs/connexion";

export const CONFIG_GET_UTILISATEUR_CONNECTE: TConfigurationApi<typeof URI, undefined, undefined, IUtilisateurDto> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
