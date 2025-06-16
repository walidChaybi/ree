import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";

const URI = "/projetacte/:idActe";

export const CONFIG_GET_PROJET_ACTE: TConfigurationApi<typeof URI, undefined, undefined, IProjetActeTranscritDto> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
