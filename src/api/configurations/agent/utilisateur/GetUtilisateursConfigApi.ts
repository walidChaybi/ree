import { AGENT_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import IUtilisateurDto from "../../../../dto/etatcivil/agent/IUtilisateurDto";

const URI = "/utilisateurs/all";


export interface IPaginationParams {
  lite: boolean;
  range?: string;
}

export const CONFIG_GET_TOUS_UTILISATEURS: TConfigurationApi<
  typeof URI,
  undefined,
  IPaginationParams,
  IUtilisateurDto[]
> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
