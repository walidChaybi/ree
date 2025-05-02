import { COMPOSITION_API, ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";

const URI_CREATION_PROJET_ACTE_TRANSCRIT = "/projetacte/transcrit";

const URI_COMPOSITION_ACTE = "/composition/:typeComposition/:version";

export interface IPostProjetActeTranscriptionConfigApiParams {
  projetActe: IProjetActeTranscritDto;
  idRequete: string;
  numeroDossierNational?: string;
}

export interface ICorpsCompositionActePDF {
  nature_acte?: string;
  texte_corps_acte?: string;
  mentions?: string;
  titulaires?: string;
}

export interface IReponseCompositionActePDF {
  contenu: string;
  nbPages: number;
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

export const CONFIG_COMPOSITION_ACTE_PDF: TConfigurationApi<
  typeof URI_COMPOSITION_ACTE,
  ICorpsCompositionActePDF,
  undefined,
  IReponseCompositionActePDF
> = {
  api: COMPOSITION_API,
  methode: "POST",
  uri: URI_COMPOSITION_ACTE
};
