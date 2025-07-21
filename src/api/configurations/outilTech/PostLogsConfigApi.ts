import { OUTILTECH_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/log";

interface IInfoLog {
  date: number;
  message: string;
}

export const CONFIG_POST_LOGS: TConfigurationApi<typeof URI, IInfoLog[]> = {
  api: OUTILTECH_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
