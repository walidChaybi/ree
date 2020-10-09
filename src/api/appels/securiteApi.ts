import { HttpMethod, ApiManager } from "../ApiManager";
import { ApiEndpoints } from "../../views/router/UrlManager";

const api = ApiManager.getInstance("rece-securite-api", "v1");

export interface IQueryParametersUtilisateursService {
  idArobas?: string;
}

export function getLogin(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: ApiEndpoints.SecuriteUrl
  });
}

export function getUtilisateurs(idArobas: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: ApiEndpoints.UtilisateursUrl,
    parameters: {
      idArobas
    }
  });
}
