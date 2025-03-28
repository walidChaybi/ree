import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";

const URI_CREATION_PROJET_ACTE_TRANSCRIT = "/projetacte/transcrit";

export interface IPostProjetActeTranscriptionConfigApiParams {
  projetActe: IProjetActeTranscritDto;
  idRequete: string;
  numeroDossierNational?: string;
}

export const CONFIG_POST_PROJET_ACTE_TRANSCRIPTION: TConfigurationApi<
  typeof URI_CREATION_PROJET_ACTE_TRANSCRIT,
  IProjetActeTranscritDto,
  IPostProjetActeTranscriptionConfigApiParams,
  IProjetActeTranscritDto
> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI_CREATION_PROJET_ACTE_TRANSCRIT,
  avecAxios: true
};
