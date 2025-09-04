import { AGENT_API } from "@api/ApiDisponibles";
import { IUtilisateurDto } from "@model/agent/Utilisateur";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/utilisateurs/referentiel";

interface IPaginationParams {
  range?: string;
}

export const CONFIG_GET_TOUS_UTILISATEURS: TConfigurationApi<typeof URI, undefined, IPaginationParams, IUtilisateurDto[]> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
