import { AGENT_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import IServiceDto from "../../../../dto/etatcivil/agent/IServiceDto";

const URI = "/services";

interface IServiceParent {
  idService?: string;
}

export const CONFIG_GET_TOUS_SERVICES_FILS: TConfigurationApi<typeof URI, undefined, IServiceParent, IServiceDto[]> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
