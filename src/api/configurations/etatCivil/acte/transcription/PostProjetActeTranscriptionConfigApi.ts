import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IProjetActeTranscritFormDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritFormDto";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";

const URI_CREATION_PROJET_ACTE_TRANSCRIT = "/projetacte/transcrit";

export const CONFIG_POST_PROJET_ACTE_TRANSCRIPTION: TConfigurationApi<
  typeof URI_CREATION_PROJET_ACTE_TRANSCRIT,
  IProjetActeTranscritFormDto,
  undefined,
  IProjetActeTranscritDto
> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI_CREATION_PROJET_ACTE_TRANSCRIT,
  avecAxios: true
};
