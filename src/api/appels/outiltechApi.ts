import { HttpMethod, ApiManager } from "../ApiManager";

// Url APIs
const URL_ENVOI_LOG = "/log";

const api = ApiManager.getInstance("rece-outiltech-api", "v1");

export interface IQueryParameterPostLog {
  date: number;
  idCorrelation: string;
  message: string;
}

export function postLog(
  queryParameters: IQueryParameterPostLog[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: URL_ENVOI_LOG,
    data: queryParameters,
    headers: []
  });
}
