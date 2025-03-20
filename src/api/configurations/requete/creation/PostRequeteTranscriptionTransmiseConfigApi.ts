/* v8 ignore start A TESTER 03/25 */
import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/creationsTransmissionService";

interface IQuery {
  idService: string;
}

export const CONFIG_POST_REQUETE_TRANSCRIPTION_TRANSMISE: TConfigurationApi<typeof URI, any, IQuery, { id: string }[]> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};
/* v8 ignore end */
