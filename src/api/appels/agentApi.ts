import { ApiManager, HttpMethod } from "../ApiManager";

// Url APIs
const URL_UTILISATEURS_LOGIN = "/utilisateurs/login";
const URL_UTILISATEURS = "/utilisateurs";
const URL_UTILISATEURS_TOUS = "/utilisateurs/all";
const URL_UTILISATEURS_INFOS = "/utilisateurs/infos";
const URL_TOUS_SERVICES = "/service/all";
const URL_SERVICES_FILS = "/service";

const api = ApiManager.getInstance("rece-agent-api", "v1");

export interface IQueryParametersUtilisateursService {
  idArobas?: string;
}

export function getLogin(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_UTILISATEURS_LOGIN
  });
}

export function getUtilisateurs(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_UTILISATEURS
  });
}

export function getTousLesUtilisateurs(
  plage?: string,
  leger = false
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_UTILISATEURS_TOUS}`,
    parameters: {
      range: plage,
      lite: leger
    }
  });
}

export function getTousLesServices(plage?: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_TOUS_SERVICES,
    parameters: {
      range: plage
    }
  });
}

export function getTousLesServicesFils(idService?: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_SERVICES_FILS,
    parameters: {
      idService
    }
  });
}

export function getUtilisateursById(ids: string[]): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_UTILISATEURS_INFOS}`,
    parameters: {
      ids
    }
  });
}
