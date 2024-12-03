import { AGENT_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import IUtilisateurDto from "../../../../dto/etatcivil/agent/IUtilisateurDto";

const URI = "/utilisateurs/referentiel";


export interface IPaginationParams {
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
