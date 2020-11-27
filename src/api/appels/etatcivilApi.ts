import { HttpMethod, ApiManager } from "../ApiManager";
import { ApiEndpoints } from "../../views/router/UrlManager";

const api = ApiManager.getInstance("rece-etatcivil-api", "v1");

export function getInformationsFiche(
  categorie: string,
  identifiant: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${ApiEndpoints.RepertoirecivilUrl}/${categorie}/${identifiant}`
  });
}
