import { AGENT_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import IServiceDto from "../../../../dto/etatcivil/agent/IServiceDto";

const URI = "/service/all";

export interface IPaginationParams {
  range?: string;
}

export const CONFIG_GET_TOUS_SERVICES: TConfigurationApi<
  typeof URI,
  undefined,
  IPaginationParams,
  IServiceDto[]
> = {
  api: AGENT_API,
  methode: "GET",
  uri: URI
};
