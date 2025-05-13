import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import {
  IProjetActeTranscritDto,
  IProjetActeTranscritPatchDto
} from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";

const URI_PATCH_PROJET_ACTE_TRANSCRIT = "/projetacte";

export const CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION: TConfigurationApi<
  typeof URI_PATCH_PROJET_ACTE_TRANSCRIT,
  IProjetActeTranscritPatchDto,
  undefined,
  IProjetActeTranscritDto
> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI_PATCH_PROJET_ACTE_TRANSCRIT,
  avecAxios: true
};
