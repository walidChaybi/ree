import { AGENT_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import IUtilisateurDto from "../../../../dto/etatcivil/agent/IUtilisateurDto";

const URI = "/utilisateurs/login";

export const CONFIG_GET_UTILISATEUR_LOGIN: TConfigurationApi<
  typeof URI,
  undefined,
  undefined,
  IUtilisateurDto
> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
