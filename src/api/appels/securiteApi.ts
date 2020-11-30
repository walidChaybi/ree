import { HttpMethod, ApiManager } from "../ApiManager";

// Url APIs
const URL_UTILISATEURS_LOGIN = "/utilisateurs/login";
const URL_UTILISATEURS = "/utilisateurs";

const api = ApiManager.getInstance("rece-securite-api", "v1");

export interface IQueryParametersUtilisateursService {
  idArobas?: string;
}

export function getLogin(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_UTILISATEURS_LOGIN
  });
}

export function getUtilisateurs(idArobas: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_UTILISATEURS,
    parameters: {
      idArobas
    }
  });
}
