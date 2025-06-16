import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IProjetActeTranscritDto, IProjetActeTranscritPostDto } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";

const URI_CREATION_PROJET_ACTE_TRANSCRIT = "/projetacte/transcrit";

export const CONFIG_POST_PROJET_ACTE_TRANSCRIPTION: TConfigurationApi<
  typeof URI_CREATION_PROJET_ACTE_TRANSCRIT,
  IProjetActeTranscritPostDto,
  undefined,
  IProjetActeTranscritDto
> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI_CREATION_PROJET_ACTE_TRANSCRIT,
  avecAxios: true
};
