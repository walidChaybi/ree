import { ApiManager, HttpMethod } from "../ApiManager";

// Url APIs
const URL_MAIL = "/mail";

const api = ApiManager.getInstance("rece-mail-api", "v1");

export function getEnvoyerMail(data: any): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: URL_MAIL,
    data
  });
}
