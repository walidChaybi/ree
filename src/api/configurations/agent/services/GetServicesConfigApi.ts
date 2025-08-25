import { AGENT_API } from "@api/ApiDisponibles";
import { IServiceDto } from "@model/agent/IService";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/services/referentiel";

interface IPaginationParams {
  range?: string;
}

export const CONFIG_GET_TOUS_SERVICES: TConfigurationApi<typeof URI, undefined, IPaginationParams, IServiceDto[]> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
