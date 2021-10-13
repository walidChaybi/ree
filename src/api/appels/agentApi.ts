import { ApiManager, HttpMethod } from "../ApiManager";

// Url APIs
const URL_UTILISATEURS_LOGIN = "/utilisateurs/login";
const URL_UTILISATEURS = "/utilisateurs";
const URL_UTILISATEURS_TOUS = "/utilisateurs/all";
const URL_UTILISATEURS_INFOS = "/utilisateurs/infos";
const URL_ENTITE_RATTACHEMENT_TOUTES = "/entiterattachement/all";

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

export function getToutesLesEntiteRattachement(plage?: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_ENTITE_RATTACHEMENT_TOUTES,
    parameters: {
      range: plage
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
