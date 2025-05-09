import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IProjetActeTranscritFormDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritFormDto";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";

const URI_PATCH_PROJET_ACTE_TRANSCRIT = "/projetacte";

export interface IPatchProjetActeTranscriptionConfigApiParams {
  projetActe: IProjetActeTranscritDto;
}

export const CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION: TConfigurationApi<
  typeof URI_PATCH_PROJET_ACTE_TRANSCRIT,
  IProjetActeTranscritFormDto,
  IPatchProjetActeTranscriptionConfigApiParams,
  IProjetActeTranscritDto
> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI_PATCH_PROJET_ACTE_TRANSCRIT,
  avecAxios: true
};
