import { AGENT_API } from "@api/ApiDisponibles";
import { IServiceDto } from "@model/agent/IService";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/services";

interface IServiceParent {
  idService?: string;
}

export const CONFIG_GET_TOUS_SERVICES_FILS: TConfigurationApi<typeof URI, undefined, IServiceParent, IServiceDto[]> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
